# myacorn
[Unoffical] API for Acorn SWS [Student Web Services] (https://acorn.utoronto.ca/sws), University of Toronto's student information service. The API is available only as a `node_module` in Node.js.
[![Build Status](https://travis-ci.com/OwaisSiddiqui/myacorn.svg?token=VqefhyYp86hqytWSoaLy&branch=master)](https://travis-ci.com/OwaisSiddiqui/myacorn)
## Installation
```
npm install myacorn
```
## Usage
Require the `node_module`. Create a `Acorn` class with UTORid and UTORid password as the first two arguements respectively. `acorn.login()` returns a `Promise`. When it's `resolved` it returns the `acorn` object you used to `login`. You can then use the methods on the `acorn` object e.g. getting basic student info.
```javascript
const acornsws = require('myacorn')
var acorn = new acornsws("<UTORID>", "<UTORID_PASSWORD>")
acorn.login()
    .then(result => {
        // result is the Acorn object
        return result.studentBasicInfo()
    })
    .then(data => {
        // data is the JSON object with the information
        return acorn.logout()
    })
    .catch(error => {
        console.log(error)
    })
```
## Features
As of now, the API is very minimal; it only makes GET requests to obtain information of the logged in UTORid user. If I have more time I can add more GET requests and POST requests (course enrollments, accepting POSt) in the future. If you want to do implement it yourself, go through https://acorn.utoronto.ca/sws/scripts/scripts.min.b64b9514.js (main JS file of Acorn, with the file prettified) and find the method: "GET" or "POST" and add those to the Acorn class. Then create a pull request and I'll merge it.
## Warning
I recommended not directly inputting your UTORid credentials to the Acorn class but save it in a `.env` file and call that (using the `node_module` `dotenv`). Be extra careful when submitting POST requests (when they are implemented) from the API (e.g. course enrollment, accepting a POSt) since no tests have been conducted for POST requests. Any unexpected errors or unwanted changes to your Acorn account is your own responsibility. It should only be used for personal/individual use.
## Contributions
Submit an issue (can also be questions/suggestions) and open a pull request.
## Documentation
Full documentation https://myacorn.vercel.app/#/