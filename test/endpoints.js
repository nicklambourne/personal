let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');


let assert = chai.assert;

chai.use(chaiHttp);

describe('App', function() {
    describe('/', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get('/')
                .end(function (err, res) {
                    assert(res.status == 200, "Root URL: OK", "Root URL: FAILED");
                    done();
                })
        })
    });

    describe('404', function () {
        it('404', function (done) {
            chai.request(app)
                .get('///')
                .end(function (err, res) {
                    assert(res.status == 404, "404: OK", "404: FAILED");
                    done();
                })
        })
    });
});
