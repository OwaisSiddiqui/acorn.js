# acorn.js
[Unoffical] API for Acorn (https://acorn.utoronto.ca/sws), University of Toronto's student information service.
## Installation
The API is available only as a `node_module` within Node.js. Use the command below to install the `node_module` using `npm`:
```
npm install acorn.js
```
## Usage
Require the `acorn.js` `node_module`. Create an `Acorn` class with a UTORid and its UTORid password by inputting them into the first two arguments of the `acorn.js` object respectively. Never directly put your credentials in plain-text. Use a `.env` file as in the example below. Now, you are able to use `acorn.login()` on the `Acorn` object to login to the UTORid account. The `login` method returns a `Promise`. When the Promise is resolved, it returns the same `Acorn` object you used to `login`. You can then use the methods on the `Acorn` object e.g. getting basic student info by using `Acorn.getStudentBasicInfo`.
```javascript
require('dotenv').config()
const acornjs = require('acorn.js')
var acorn = new acornjs(process.env.UTORID, process.env.UTORID_PASSWORD)
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
1. Never input your UTORid credentials to the directly to the `Acorn` class but save it in a `.env` file and call that (using the `node_module` `dotenv`). Always make sure it is ignored by the `.gitignore` file. If at anytime anyone makes a pull request or share theirs or others UTORid credentials to the public, this repository will be shutdown immediately and I won't look back. I also suggest that person to immediately change their Acorn password (and any other Univeristy of Toronto service which uses similar passwords).
2. Due to the high risk of accidentally making unwanted changes to your Acorn account, there will be absolutely no implementations of methods which make POST requests to Acorn. Examples of methods are enrolling in courses, accepting a POSt, and so on.
3. Any unexpected errors or unwanted changes to your Acorn account is your own responsibility. It should only be used for personal/individual use.
## Contributions
Submit an issue and open a pull request.
## Documentation
Full documentation https://acornjs.vercel.app/#/
