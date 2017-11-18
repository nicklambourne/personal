var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('App', function() {
    it('should return a 200 on the index page', function(done) {
        chai.request(server)
            .get('/')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });
    it('should return a 200 on the blog page', function(done) {
        chai.request('http://blog.hexxie.com:' + process.env.PORT)
            .get('/')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });
    it('should return a 404 on an unmapped page', function(done) {
        chai.request(server)
            .get('/doesnotexist')
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });
});