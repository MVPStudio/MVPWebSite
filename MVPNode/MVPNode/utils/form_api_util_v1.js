/*
 * Utilities for API version 1. Version 1 of the API is defined by simply storing all values as strings.
 * 
 * It is fully expected for this version to be superceded before production
 */
var mssql = require("./mssql_connect.js");

var FormApi = function () {}

/**
 * Save the data from a form by simply parsing both keys and properties into strings
 */
FormApi.prototype.saveForm = function (req, res) {
    
    const httpResponse = res;
    //console.log(req.body);
    // Try to make a request using the infromation provided
    // TODO: Make a better user feedback mechanism
    mssql.insertDictionary(req.params.table, req.body, function(res, err) {
        // If there was no error, we saved the data!
        if (!err) {
            httpResponse.render("form-success-test", {
                info: "Your form was saved successfully!" 
            });
        } else {
            //console.log(err);
            httpResponse.render("form-success-test", {
                info: "Your form faled to save, please try again" 
            });
        }
    });
}

module.exports = new FormApi();