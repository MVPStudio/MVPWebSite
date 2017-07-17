/**
 * The `config.js` file is used to configure connection to the cloud SQL instance
 */
var config = {
    user: "*******************",
    password: "******************",
    server: "mvpstudio.database.windows.net",
    database: "MVPTest",

    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}

module.exports = config;