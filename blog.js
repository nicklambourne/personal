let express = require('express');


let router = express.Router();
module.exports = router;

router.get('/', function(req, res) {
    res.render('blog');
});

router.get('/about', function(req, res) {
    res.render('about');
});

router.get('/projects', function(req, res) {
    res.render('projects');
});