/**
 * Custom module is used to connect to the database we are using for storage of user data
 * 
 * -------------------------------------------------------------------------------
 * The 'mssqslConnect' named object is used to connect to a Microsoft SQL instance
 * -------------------------------------------------------------------------------
 */
const mssql = require('mssql');

// Get the configuration file, and give a nice error if it can't be found
var config;
try {
    config = require('../sql_config/sql_config.js');
} catch (e) {
    console.error("ERROR: The sql_config.js file could not be found! This file is required to connect to the database, however\n" +
                  "it is NOT provided in the repository and must be added to the correct folder manually");

    throw(e);
}

// The connection pool we are using to do database calls
var pool = null;

var MSSQLConnect = function (cb) {
    this.connect(cb);
};

/**
 * Connects the object to the database. This function MUST be called before anything else, and is called
 * automatically in the constructor
 * 
 * The callback should be in the form of `cb(err)`. When there is an error, `err` will be populated
 */
MSSQLConnect.prototype.connect = function (cb) {

    // Make sure we don't have a null callback
    if (!cb) cb = new function () {};

    pool = new mssql.ConnectionPool(config);
    pool.connect(function (err) {
        cb(err);
    });
}

/**
 * Used to make a query to the databse. This function takes a query object generated by the 'sql' javascript library. The results
 * of the query are provided to the callback
 * 
 * This is a public helper function used to consilidate code. For non-testing purposes a function relating to a specific
 * query should be used
 * 
 * The callback should be of the form `cb(data, err)`. When there is an error, `data` is NULL and the `err` argument is populated
 */
MSSQLConnect.prototype.query = function (query, cb) {

}

/**
 * Will provide all of the rows from all of the columns of the provided table to a callback function
 * 
 * The callback should be of the form `cb(data, err)`. When there is an error, `data` is NULL and the `err` argument is populated
 */
MSSQLConnect.prototype.selectAll = function(tableName, cb) {

}

/**
 * Will provide a table row with the provided email to a callback function
 * 
 * The callback should be of the form `cb(data, err)`. When there is an error, `data` is NULL and the `err` argument is populated
 */
MSSQLConnect.prototype.selectWithEmail = function(tableName, email, cb) {

}

MSSQLConnect.prototype.select

exports.MSSQLConnect = MSSQLConnect;
