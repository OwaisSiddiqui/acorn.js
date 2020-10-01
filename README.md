# Acorn API
[Unoffical] API for Acorn (https://acorn.utoronto.ca/sws), University of Toronto's student information service. The API is available only as a `node_module` in Node.js.
# Installation
```
npm install acorn-sws
```
# Usage
Require the `node_module`. Create a `Acorn` class with UTORid and UTORid password as the first two arguements respectively. `acorn.login()` returns a `Promise`. When it's `resolved` it returns the `acorn` object you used to `login`. You can then use the methods of getting information from your Acorn account e.g. basic student info.
```javascript
const acornsws = require('acorn-sws')
var acorn = new acornsws(<UTORID>,<UTORID_PASSWORD>)
var studentBasicInfo = null
acorn.login()
    .then(result => {
        return result.getStudentBasicInfo()
    })
    .then(data => {
        studentBasicInfo = data
        console.log(studentBasicInfo)
        return acorn.logout()
    })
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
```
# Warning
Be extra careful when submitting POST requests from the API (e.g. course enrollment, accepting a POSt) since no tests have been conducted for POST requests. Any unexpected errors or unwanted changes to your Acorn account is your own responsibility. Do not use this on the backend for public websites; this should be obvious but taking others UTORid credentials in any form is illegal unless officially affiliated with the University of Toronto. This API has absolutely zero security. It should only be used for personal use.
# Configuration
There is no backend server linked to this API. All the `node-fetch` requests (e.g. login, course enrollment) are made locally.
# Contributions
Submit issues and create pull requests.
# Questions
Either create an issue or send a DM to my Discord username: Strikerzs#0498.