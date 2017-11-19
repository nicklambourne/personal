let express = require('express');
let request = require('request');
let uuid = require('uuid');
let Post = require('./models/models').Post;
let _ = require('lodash');


let router = express.Router();
module.exports = router;

let base = (process.env.ENV == 'development') ? 'hexxie.com:'+process.env.PORT.toString() : 'ndl.im';

router.get('/', function(req, res) {
    Post.find({}, 'id title content published').sort('-published').exec(function (error, posts) {
        if (error) {
            console.log(error.toString());
        } else {
            res.render('blog-home', {title: 'Blog', posts: posts, base: base});
        }
    });
});

router.get('/about', function(req, res) {
    res.render('about', {title: 'About', base: 'blog.' + base});
});

router.get('/projects', function(req, res) {
    res.render('projects', {title: 'Projects', base: 'blog.' + base});
});

router.get('/meta', function(req, res) {
    res.render('meta', {title: 'Meta', base: 'blog.' + base});
});

router.get('/reading', function(req, res) {
    res.render('reading', {title: 'Reading', base: 'blog.' + base});
});

router.get('/listening', function(req, res) {
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
            res.render('listening', {title: 'About',
                base: 'blog.' + base,
                data: napster_data
            });
        })
    });
});

router.get('/post/new', function (req, res) {
    res.render('edit-post', {title: 'New Post', base: 'blog.' + base});
});

router.post('/post/new', function (req, res) {
    let id = uuid.v4();
    let title = req.body.title;
    let content = req.body.content;
    let published = Date.now();
    let obj = new Post({id: id, title: title, published: published, content: content});
    obj.save(function (err, obj) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Content: ' + content.toString());
            console.log('Added object: ' + obj.toString());
        }
    });
    res.redirect('/');
});

router.get('/post/edit/:id', function(req, res) {
    Post.findOne( {'id': req.params.id} ,function (error, post) {
        if (error) {
            console.log(error.toString());
            res.sendStatus(404);
        } else {
            res.render('edit-post', {title: 'NDL', post: post, base: 'blog.' + base});
        }
    });
});

router.post('/post/edit/:id', function (req, res) {
    let title = req.body.title;
    let content = req.body.content;
    Post.findOne( {'id': req.params.id} ,function (error, post) {
        if (error) {
            console.log(error.toString());
            res.sendStatus(404);
        } else {
            post.title = title;
            post.content = content;
            post.save();
            console.log('Edited object: ' + post.toString());
            res.redirect('/post/' + post.id.toString());
        }
    });
});

router.get('/post/:id', function (req, res) {
    Post.findOne( {'id': req.params.id} ,function (error, post) {
        if (error) {
            console.log(error.toString());
            res.sendStatus(404);
        } else {
            res.render('post', {title: 'NDL', post: post, base: 'blog.' + base});
        }
    });
});



