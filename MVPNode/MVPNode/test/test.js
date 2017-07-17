var assert = require('assert');
var mssqlConnect;
describe('dbConnect', function() {
  describe('Initialization', function() {
    it('should initialize without errors', function() {
      mssqlConnect = require('../utils/dbConnect.js').MSSQLConnect;
    });
  });
});