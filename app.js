// Dependencies
let express = require('express');
let sslRedirect = require('heroku-ssl-redirect');
let subdomain = require('express-subdomain');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let blogRouter = require('./blog');
let adminRouter = require('./admin');
let aws = require('aws-sdk');
let s3 = new aws.S3();

// Initialisation & Settings
let app = express();
app.set('views', 'views');
app.set('view engine', 'jade');

// Document DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI)
    .catch(function (err) {
        console.log('Database connection failed!' + err);
    }
);

// Object Storage
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'ap-southeast-2';

// Middleware
app.use(sslRedirect());
app.use((bodyParser.urlencoded({ extended: true})));

// Static Files
app.use(express.static('public'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/popper.js/dist'));
app.use(express.static('node_modules/tinymce'));
app.use(express.static('node_modules/font-awesome'));

// Routes
let base = (process.env.ENV == 'development') ? 'hexxie.com:'+process.env.PORT.toString() : 'ndl.im';
app.use(subdomain('blog', blogRouter));
app.use(subdomain('admin', adminRouter));
app.get('/', function (req, res) {
    res.render('index', {title: 'NDL', base: base});
});

app.get('/cv', function (req, res) {
    res.redirect('https://github.com/nicklambourne/resume/raw/master/resume.pdf')
});

// Custom 404
app.use(function(req, res, next){
    res.status(404).render('404', {title: "Sorry, page not found", base: base});
});

// Run
app.listen(process.env.PORT, function () {
    console.log('Server listening on port ' + process.env.PORT + '...');
});

module.exports = app;