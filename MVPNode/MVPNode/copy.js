'use strict';

// The "copy" script is a simple file systems process that will copy the contents of the "MVPWeb" directory
// (if it exists) to the "public" directory

// "require" constants
const path = require('path');
const fs = require('fs-extra');

// non-require constants and variables
var sourcePath = path.join(__dirname, ".." ,".." ,"MVPWeb");
var destinationPath = path.join(__dirname, "public");

function run() {
    console.log("Finding MVPWeb directory...")

    fs.stat(sourcePath, function (err, stats) {

        if (err) {
            // The directory doesn't exist! Or there is some other error that prevents us from accessing it
            console.log("MVPWeb directory not found! This may be expected. Exiting Copy script...\n");
            process.exit(0);
        } else if (!stats.isDirectory()) {
            // The directory isn't actually a directory!
            console.log("\'" + sourcePath + "\' was found but is not a directory! Exiting Copy script...\n");
            process.exit(0);
        } else {
            // The source directory does exist, and it IS a directory! We may move on
            console.log("MVPWeb directory found!\n");
            deletePublic();
        }
    });
}

function deletePublic() {
    console.log("Attempting to delete old `public` directory...");
    
    fs.remove(destinationPath, function (err) {
        if (err) {
            // There was an error deleting the directory!
            console.log("Unable to delete old `public` directory! Continuing script...\n")
        } else {
            // Deleted successfully!
            console.log("Deleted old `public` directory successfully!\n")
        }

        copySourceToDestinationDirectory();
    });
}

function copySourceToDestinationDirectory() {
    console.log("Attempting to copy MVPWeb directory...");

    fs.copy(sourcePath, destinationPath, function (err) {
        if (err) {
            console.error("Unable to copy MVPWeb directory! This error may be expected:\n" + err);
            process.exit(0);
        }

        console.log("MVPWeb directory copied successfully!\n")
        process.exit(0);
    });
}

run();
