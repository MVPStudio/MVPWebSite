'use strict';

// The "copy" script is a simple file systems process that will copy the contents of the "MVPWeb" directory
// (if it exists) to the "public" directory

// "require" constants
const path = require('path')
const ncp = require('ncp');

// non-require constants and variables
var sep = path.sep;

function run() {
    var sourcePath = path.join(__dirname, ".." ,".." ,"MVPWeb");
    var destinationPath = path.join(__dirname, "public");

    console.log("Attempting to copy MVPWeb directory...\n");

    ncp.ncp(sourcePath, destinationPath, function (err) {
        if (err) {
            console.error("Unable to copy MVPWeb directory! This error may be expected:\n" + err);
            process.exit(0);
        }

        console.log("MVPWeb directory copied successfully!\n")
        process.exit(0);
    });
}

run();
