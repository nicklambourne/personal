// Dependencies
let express = require('express');
let sslRedirect = require('heroku-ssl-redirect');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRouter = require('./api');

// Initialisation & Settings
let app = express();
app.set('views', 'views');
app.set('view engine', 'pug');

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
let base = (process.env.ENV === 'development') ? 'hexxie.com:' + process.env.PORT.toString() : 'ndl.im';
app.use(apiRouter);

app.get('/', function (req, res) {
    res.render('index', {title: 'NDL', base: base});
});

app.get('/about', function(req, res) {
    res.redirect('https://blog.ndl.im/about/');
});

app.get('/blog', function(req, res) {
    res.redirect('https://blog.ndl.im');
});


app.get('/admin', function (req, res) {
    res.redirect('https://admin.ndl.im');
});

app.get('/projects', function (req, res) {
    res.redirect('https://github.com/nicklambourne');
});

app.get('/cv', function (req, res) {
    res.redirect('https://github.com/nicklambourne/resume/raw/master/cv.pdf');
});

app.get('/listening', function(req, res) {
    request.post({
        url: 'https://api.napster.com/oauth/token',
        auth: {
            user: process.env.NAPSTER_KEY,
            pass: process.env.NAPSTER_SECRET,
        },
        form: {
            username: process.env.NAPSTER_USERNAME,
            password: process.env.NAPSTER_PASS,
            grant_type: 'password',
        }
    }, function (error, response, body) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(body);
        let token = JSON.parse(body).access_token;
        request.get({
            url: 'https://api.napster.com/v2.2/me/listens',
            headers: {
                Authorization: "Bearer " + token
            }
        }, function (error, response, body) {
            if (error) {
                console.log(error);
                throw error;
            }
            let napster_data = JSON.parse(body).tracks;
            console.log(napster_data);
            res.render('listening', {title: 'NDL',
                base: 'blog.' + base,
                proxy: 'proxy.' + base,
                data: napster_data
            });
        })
    });
});

app.get('/reading', function(req, res) {
    res.render('reading', {title: 'Reading', base: base});
});

// Custom 404
app.use(function(req, res, next){
    res.status(404).render('404', {title: "Whoops...", base: base});
});

// Run
app.listen(process.env.PORT, function () {
    console.log('Server listening on port ' + process.env.PORT + '...');
});

module.exports = app;