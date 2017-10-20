// Dependencies
let express = require('express');
let sslRedirect = require('heroku-ssl-redirect');
let subdomain = require('express-subdomain');
let mongoose = require('mongoose');
let uuid = require('uuid');
let blogRouter = require('./blog');
let models = require('./models/models');
let aws = require('aws-sdk');
let s3 = new aws.S3();

// Initialisation & Settings
let app = express();
app.set('views', 'views');
app.set('view engine', 'jade');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI)
    .catch(function (err) {
        console.log('Database connection failed!' + err);
    }
);
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'ap-southeast-2';

// Middleware
app.use(sslRedirect());
app.use(subdomain('blog', blogRouter));

// Static Files
app.use(express.static('public'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/popper.js/dist'));
app.use(express.static('node_modules/font-awesome'));

// Routes
app.get('/', function (req, res) {
    res.render('index', {title: 'NDL'});
});

app.get('/hello', function(req, res) {
    let id = uuid.v4();
    let content = 'hello';
    let published = Date.now();
    let obj = new models.Post({id: id, published: published, content: content});
    obj.save(function (err, obj) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Added object: ' + obj.toString());
        }
    });
    res.redirect('/')
});

// Run
app.listen(process.env.PORT, function () {
    console.log('Server listening on port ' + process.env.PORT + '...');
});
