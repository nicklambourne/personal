let express = require('express');
let request = require('request');
let Post = require('./models/models').Post;
let Book = require('./models/models').Book;
let _ = require('lodash');


let router = express.Router();

let base = (process.env.ENV == 'development') ? 'hexxie.com:' + process.env.PORT.toString() : 'ndl.im';

router.get('/api', function (req, res, next) {
    // Comment out this line:
    //res.send('respond with a resource');

    // And insert something like this instead:
    return res.json([{
        id: 1,
        username: "samsepi0l"
    }, {
        id: 2,
        username: "D0loresH4ze"
    }]);
});


module.exports = router;