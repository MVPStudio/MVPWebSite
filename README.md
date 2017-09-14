# MVPWebSite
The web site for MVP Studio. 

## Info
Currently, MVP Studio is statically hosted using a node web service and is split into two parts, [MVPWeb](MVPWeb), and [MVPNode](MVPNode/MVPNode).

The [MVPWeb](MVPWeb) directory contains the statically hosted html. The Node server points to this directory for static hosting - therefor all files in this directory are accessable externally.

The [MVPNode](MVPNode/MVPNode) directory contains the Node server files that connect to the database and host the html from [MVPWeb](MVPWeb).

## Running the Node server
To run the server, use the `npm start` command from the [MVPNode](MVPNode/MVPNode) directory. The default port is 3000.

Unit tests for the server are written in Mocha, and can be run by using the command `npm test`

**NOTE:** In order to connect with the SQL server hosting user data, a `sql_config.js` file must be manually added to the [MVPNode/MVPNode/sql_config](MVPNode/MVPNode/sql_config) directory. This file contains credentials for the SQL server, and thus, is not included in the public repository.

## General Server API Guidelines
The Node server uses a simple REST API to accept form data.

The endpoint for API access is described thusly:
```
/form-api/v/:version/...
```
The `:version` parameter represents the version of the API that you wish to access. This should remain consistant throughout the lifetime of the project. Additional endpoints and request body requirements will generally be version specific.

## API Version 1 (Current Latest)
API Version 1 is defined by storing *all* data in string form. This version of the API will also take control of rendering success or failure, and does not "return" that success or failure value in its response. It is expected that this version will be superceded later in the project

The full endpoint for accessing API version 1 looks like this:
```
/form-api/v/1/t/:table
```
The `:table` parameter represents the *exact* name of the table that data will be inserted into, for instance, to add data to the `test` table the following endpoint will be used"
```
/form-api/v/1/t/test
```
The actual data to be added to the table should be in the body of the request, stored as JSON with the following form:
```JSON
{ "key1": "value1",
  "key2": "value2",
  "key3": "value3" }
```
The keys all represent the *exact* column names for the table being accessed, and the values represent the data that will be put into that column

Note that it is *not* required that all values are convert to a string format before being sent to the API, the Node server will automatically convert all stored JSON data into strings.

This API is specifically designed to work with HTML forms. In order to have an HTML form work with this API, simply name all the form fields appropriately, and apply the appropriate `action` attribute
