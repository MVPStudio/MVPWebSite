/**
 * Custom module is used to connect to the database we are using for storage of user data
 */
/**
 * The 'mssqslConnect' named object is used to connect to a Microsoft SQL instance
 */
const mssql = require('mssql');

// Determine the config file to use based on the existance of `localconfig.js`
var config;
try {
    config = require('../sql_config/localconfig.js');
} catch (e) {
    // The local config can't be found - use the regular config instead
    config = require('../sql_config/config.js');
}

// The connection pool we are using to do database calls
var pool = null;

var mssqlConnect = function () {};

/**
 * Connects the object to the database. This function MUST be called before anything else!
 */
mssqlConnect.prototype.connect = function (callback) {
    pool = new mssql.ConnectionPool(config);
    pool.connect(function (err) {
        if (err) {
            // There was an error connecting the pool!
            console.error(err);

            callback(err);
        } else {
            // There was no error, give back an empty callback
            callback();
        }
    });
}

exports.MSSQLConnect = new mssqlConnect();
