let express = require('express');
let Post = require('./models/models').Post;
let _ = require('lodash');

let router = express.Router();
module.exports = router;

router.get('/', function(req, res) {
    Post.find({}).sort('-published').exec(function (error, posts) {
        if (error) {
            console.log(error.toString());
        } else {
            res.render('blog-home', {title: "Blog", posts: posts});
        }
    });

});

router.get('/about', function(req, res) {
    res.render('about', {title: "About"});
});

router.get('/projects', function(req, res) {
    res.render('projects', {title: "Projects"});
});

router.get('/meta', function(req, res) {
    res.render('meta', {title: "Meta"});
});