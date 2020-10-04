# myacorn
[Unoffical] API for Acorn (https://acorn.utoronto.ca/sws), University of Toronto's student information service.
  
[![Build Status](https://travis-ci.com/OwaisSiddiqui/myacorn.svg?token=VqefhyYp86hqytWSoaLy&branch=master)](https://travis-ci.com/OwaisSiddiqui/myacorn)
## Installation
The API is available only as a `node_module` within Node.js. Use the command below to install the `node_module` using `npm`:
```
npm install myacorn
```
## Usage
Require the `myacorn` `node_module`. Create an `Acorn` class with a UTORid and its UTORid password by inputting them into the first two arguements of the `myacorn` object respectively. Now, you are able to use `acorn.login()` on the `Acorn` object to login to the UTORid account. The `login` method returns a [Promise]. When the Promise is resolved, it returns the same `Acorn` object you used to `login`. You can then use the methods on the `Acorn` object e.g. getting basic student info by using `Acorn.getStudentBasicInfo`.
```javascript
const myacorn = require('myacorn')
var acorn = new myacorn("<UTORID>", "<UTORID_PASSWORD>")
acorn.login()
    .then(result => {
        // result is the Acorn object
        return result.getStudentBasicInfo()
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
- 
## Warning
1. I recommended not directly inputting your UTORid credentials to the `Acorn` class but save it in a `.env` file and call that (using the `node_module` `dotenv`).
2. Be extra careful when submitting POST requests (when they are implemented) from the API (e.g. course enrollment, accepting a POSt) since no tests have been conducted for POST requests.
3. Any unexpected errors or unwanted changes to your Acorn account is your own responsibility. It should only be used for personal/individual use.
## Contributions
Submit an issue (can also be questions/suggestions) and open a pull request.
## Documentation
Full documentation https://myacorn.vercel.app/#/

    [Promise] <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise>