// Dependencies
let express = require('express');
let sslRedirect = require('heroku-ssl-redirect');
let subdomain = require('express-subdomain');
let blogRouter = require('./blog');


// Initialisation & Settings
let app = express();
app.set('views', 'views');
app.set('view engine', 'jade');

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

// Run
app.listen(process.env.PORT, function () {
    console.log('Server listening on port ' + process.env.PORT + '...');
});
