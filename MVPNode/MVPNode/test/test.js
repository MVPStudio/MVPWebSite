var assert = require('assert');
var mssqlConnect;
describe('dbConnect', function () {

    describe('Initialization', function () {

      it('should initialize without errors', function (done) {
        
        // Create a new MSSQLConnect object and initialize it. The object will automatically attempt to connect with the
        // database when the constructor is called
        var MSSQLConnect = require('../utils/mssql_connect.js').MSSQLConnect;

        // Create a new mssqlConnect instance. The constructor automatically attempts to connect to the database and will
        // make an err callback if the connection fails
        var mssqlConnect = new MSSQLConnect(function (err) {
            if (err) {
                done(err);
            } else {
                done();
            }
          });
      });
    });
});