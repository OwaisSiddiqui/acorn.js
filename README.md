# acorn-sws
[Unoffical] API for Acorn SWS [Student Web Services] (https://acorn.utoronto.ca/sws), University of Toronto's student information service. The API is available only as a `node_module` in Node.js.
## Installation
```
npm install acorn-sws
```
## Usage
Require the `node_module`. Create a `Acorn` class with UTORid and UTORid password as the first two arguements respectively. `acorn.login()` returns a `Promise`. When it's `resolved` it returns the `acorn` object you used to `login`. You can then use the methods on the `acorn` object e.g. getting basic student info.
```javascript
const acornsws = require('acorn-sws')
var acorn = new acornsws("<UTORID>", "<UTORID_PASSWORD>")
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
## Warning
*Currently no POST requests are implemented in the API but still mentioned since they can possibly be implemented later.*

Be extra careful when submitting POST requests from the API (e.g. course enrollment, accepting a POSt) since no tests have been conducted for POST requests. Any unexpected errors or unwanted changes to your Acorn account is your own responsibility. This API has absolutely zero security implemented by me (so far). It should only be used for personal/individual use.
## Contributions
Submit issues (can also be questions/suggestions) and create pull requests.
