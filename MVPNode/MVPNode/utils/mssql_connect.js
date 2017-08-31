/**
 * Custom module is used to connect to the database we are using for storage of user data
 */
const mssql = require('mssql');

// Make sure the mssql connection closes on an error
mssql.on("error", function(err) {
    mssql.close();
});

// Get the configuration file, and give a nice error if it can't be found
var config;
try {
    config = require('../sql_config/sql_config.js');
} catch (e) {
    console.error("ERROR: The sql_config.js file could not be found! This file is required to connect to the database, however " +
                  "it is NOT provided in the repository and must be added to the correct folder manually");

    throw(e);
}

var MSSQLConnect = function () {};

/**
 * Used to make a query to the databse. This function takes a query string formatted for MSSQL. The results
 * of the query are provided to the callback
 * 
 * The callback should be of the form `cb(res, err)`. When there is an error, `res` is NULL and the `err` argument is populated
 */
MSSQLConnect.prototype.query = function(query, cb) {

    // To prevent crashes, make sure there is a callback
    if (!cb) cb = function() {};

    const dynamicPool = new mssql.ConnectionPool(config, function(err) {
        if (err) {
            // There was an error connecting!
            cb(null, err);
            return;
        }

        dynamicPool.request().query(query, function(err, res){
            if (err) {
                // There was an error with the query
                cb(null, err);
                return;
            }

            // There was no error with the query! Close the request and Return the response data
            cb(res);
            dynamicPool.close();
        });
    });

    dynamicPool.on('error', function(err) {
        // If there is an error, close the pool
        dynamicPool.close();
    });
}

/**
 * Will use a provided table name and js dictionary (javascript object) to perform a SQL INSERT operation
 * 
 * The keys of the provided dictionary must match the collumn names of the provided table exactly in order for
 * this function to work. Additionally, only String data types are supported currently
 * 
 * The query string parsed from the provided dictionary is returned, to facilitate testing
 * 
 * The generated string is formatted for MSSQL, and will appear thusly:
 * `INSERT INTO <tableName> (<dictionary keys>) VALUES (<dictionary properties>);`
 * 
 * The callback should be of the form `cb(res, err)`. When there is an error, `res` is NULL and the `err` argument is populated
 */
MSSQLConnect.prototype.insertDictionary = function(tableName, dictionary, cb) {
    // Generate the string in two parts - the query string, and the value string
    var qString = "INSERT INTO " + tableName + " (";
    var vString = "VALUES (";

    // Get the keys of our dictionary
    var keys = Object.keys(dictionary);

    // Generate the keys section of the query along side the values section
    for (var i=0; i < keys.length; i++) {
        qString += keys[i] + (i == keys.length - 1 ? ") " : ", ");
        vString += "'" + dictionary[keys[i]].toString() + "'" + (i == keys.length - 1 ? ");" : ", ");
    }

    // Combine the strings
    qString += vString;

    // Make the query!
    this.query(qString, cb);
    return(qString);
}

module.exports = new MSSQLConnect();
