'use strict';
/*
 * Utilities for API version 1. Version 1 of the API is defined by simply storing all values as strings.
 * 
 * It is fully expected for this version to be superceded before production
 */
var mssql = require("./mssql_connect.js");
const nodemailer = require("nodemailer");

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

/**
 * Sends an email to the MVPStudio support account
 * 
 * Currently, this is only a test function, and no emails will actually be sent.
 * TODO: Configure an account to send emails from, and to accept emails to
 */
FormApi.prototype.sendMail = function (req, res) {

    const httpResponse = res;
    const httpRequest = req;

    nodemailer.createTestAccount(function(err, account) {
        if (err) {
            console.error("Error creating test nodemailer account!\n" + err);
            return;
        }

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"TestContact" <contactSender@MVPStudio.com>', // sender address
            to: 'contact@MVPStudio.com', // list of receivers
            subject: 'Message from: ' + httpRequest.body.name + ' / ' + httpRequest.body.email, // Subject line
            text: httpRequest.body.comment.toString() // plain text body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                httpResponse.render("contact-success-test", {
                    status_text: " failed to generate!",
                    link: "No link available"
                });
            } else {
                httpResponse.render("contact-success-test", {
                    status_text: " generated!",
                    link: nodemailer.getTestMessageUrl(info)
                });
            }
        });
    });
}

module.exports = new FormApi();