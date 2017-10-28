let express = require('express');
let uuid = require('uuid');
let Post = require('./models/models').Post;
let _ = require('lodash');


let router = express.Router();
module.exports = router;

let base = (process.env.ENV == 'development') ? 'hexxie.com:'+process.env.PORT.toString() : 'ndl.im';

router.get('/', function(req, res) {
    Post.find({}).sort('-published').exec(function (error, posts) {
        if (error) {
            console.log(error.toString());
        } else {
            res.render('blog-home', {title: "Blog", posts: posts, base: base});
        }
    });
});

router.get('/about', function(req, res) {
    res.render('about', {title: "About", base: base});
});

router.get('/projects', function(req, res) {
    res.render('projects', {title: "Projects", base: base});
});

router.get('/meta', function(req, res) {
    res.render('meta', {title: "Meta", base: base});
});

router.get('/post/new', function (req, res) {
    res.render('add_post', {title: "New Post", base: base});
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
            console.log('Added object: ' + obj.toString());
        }
    });
    res.redirect('/post/'+id);
});

router.get('/post/:id', function (req, res) {
    Post.findOne( {'id': req.params.id} ,function (error, post) {
        if (error) {
            console.log(error.toString());
            res.sendStatus(404);
        } else {
            res.render('post', {title: 'NDL', post: post, base: base});
        }
    });
});

