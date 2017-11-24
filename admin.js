let express = require('express');
let request = require('request');
let Post = require('./models/models').Post;
let Book = require('./models/models').Book;
let _ = require('lodash');


let router = express.Router();
module.exports = router;

let base = (process.env.ENV == 'development') ? 'hexxie.com:'+process.env.PORT.toString() : 'ndl.im';

router.get('/', function(req, res) {
    res.render('admin', {title: 'Admin', base: 'admin.' + base});
});





