var assert = require('assert');
var mssqlConnect;
describe('dbConnect', function() {
  describe('Initialization', function() {
    it('should initialize without errors', function() {
      mssqlConnect = require('../utils/dbConnect.js').MSSQLConnect;
    });
    
    it('should be able to connect without errors', function(done) {
        this.timeout(0);
        mssqlConnect.connect(function (err){
            if(err) done(err);
            else done();
        });
    });
  });
});