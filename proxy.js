let express = require('express');


let router = express.Router();
module.exports = router;

let base = (process.env.ENV == 'development') ? 'hexxie.com:'+process.env.PORT.toString() : 'ndl.im';

router.get('/sample.mp3', function(req, res) {
    return res.redirect(req.param('url'));
});



