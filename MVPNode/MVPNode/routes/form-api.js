/**
 * This is a custom router used to handle form input. This router is designed to be able to handle
 * mutliple different versions of the form api, and should be expanded upon
 * 
 * The parameters provided when posting to this rout are first the version, then the name of the table
 * posting to, in the following format:
 * `/v/<version>/t/<table>`
 */
'use strict';
var express = require('express');
var router = express.Router();

var formApiV1 = require("../utils/form_api_util_v1.js");

/* POST to the route */
router.post('/v/:version/t/:table', function (req, res, next) {
    
    switch (req.params.version) {
        case "1":
            // First check for the special `table` endpoint: "contact"
            if (req.params.table === "contact") {
                formApiV1.sendMail(req, res);
                break;
            }

            // Otherwise, simply save the form, the saveForm function takes care of responding
            formApiV1.saveForm(req, res);
        break;
        default:
            // Unknown api, send a 404 by continuing the request
            next();
        break;
    }
});

module.exports = router;
