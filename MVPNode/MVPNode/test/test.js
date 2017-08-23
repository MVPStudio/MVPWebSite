var assert = require('assert');
var mssqlConnect = require("../utils/mssql_connect.js");

// The result that was aquired in the previous test
var previousResult;

describe('dbConnect', function () {

    describe('Queries', function () {

        it('should be able to make a "SELECT * FROM test" request without errors', function(done) {

            mssqlConnect.query("SELECT * FROM test", function(res, err) {
                previousResult = res;
                done(err);
            });
        });

        it('should be able to make a selectAll query using the built in function', function(done) {

            mssqlConnect.selectAll("test", function (res, err) {
                previousResult = res;
                done(err);
            });
        });

        it('should be able to find the row with email "test1"', function(done) {
            mssqlConnect.query("SELECT * FROM test WHERE email = 'test1'", function(res, err) {
                previousResult = res;
                done(err);
            });
        });

        it('result from previous query should have a single row', checkForSingleRow);

        it('should be able to find the row with id "3"', function(done) {
            mssqlConnect.query("SELECT * FROM test WHERE id = 3", function(res, err) {
                previousResult = res;
                done(err);
            });
        });

        it('result from previous query should have a single row', checkForSingleRow);

        it('result from previous query should have email of "test2"', function() {
            assert.equal("test2", previousResult.recordset[0].email);
        });

        it('should be able to find the most recently inserted row', function(done) {
            mssqlConnect.query("SELECT TOP(1) * FROM test ORDER BY id DESC", function(res, err) {
                previousResult = res;
                done(err);
            });
        });

        it('should be able to generate and insert a valid, unique row', function(done) {
            // Get the ID from the previous result in order to generate a new id
            var newID = previousResult.recordset[0].id + 1;
            var newEmailName = "test" + newID;

            mssqlConnect.query("INSERT INTO test (email, name, constrained) VALUES ('" + newEmailName + "', '" + newEmailName + "', 'apps')", function(res, err) {
                done(err);
            });
        });

        it('should NOT be able to insert a row without an email field', function(done) {
            mssqlConnect.query("INSERT INTO test (name, constrained) VALUES ('test', 'apps')", function(res, err) {
                // res will be "null" if the query fails (which we want)
                done(res);
            });
        });

        it('should NOT be able to insert a row with an already existing email', function(done) {
            mssqlConnect.query("INSERT INTO test (email, name, constrained) VALUES ('test1', 'test1', 'apps')", function(res,err) {
                done(res);
            });
        });

        it('should NOT be able to inject SQL', function(done) {
            var injectionValue = "';INSERT INTO test (email, name, constrained) VALUES ('test0', 'test0', 'apps');'"
            mssqlConnect.query("INSERT INTO test (email, name, constrained) VALUES ('" + injectionValue + "', 'test', 'apps')", function(res, err){
                // This should fail, if it doens't fail the test immedietly
                if (res) {
                    done(res);
                    return;
                }
                
                // If the test fails, also make sure there is no 'test0' email
                mssqlConnect.query("SELECT * FROM test WHERE email = 'test0'", function(res, err) {
                    assert.equal(0, res.recordset.length);
                    done(err);
                });
            });
        });

        it('should NOT be able to delete rows', function(done) {
            mssqlConnect.query("DELETE FROM test WHERE id = 2", function(res, err) {
                done(res);
            });
        });

        it('should NOT be able to alter the table', function(done) {
            mssqlConnect.query("ALTER TABLE test ADD bad_column VARCHAR(20) NULL", function(res, err) {
                done(res);
            });
        });

        it('should NOT be able to create tables', function(done) {
            mssqlConnect.query("CREATE TABLE bad_table (column_a INT)", function(res, err) {
                done(res);
            })
        })

        it('should NOT be able to drop tables', function(done) {
            mssqlConnect.query("DROP TABLE trop_test", function(res, err) {
                done(res);
            });
        })
    });
});

/**
 * Helper function checks that the previous result has a single row
 */
function checkForSingleRow() {
    assert.equal(1, previousResult.recordset.length);
}
