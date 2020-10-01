const fetch = require('node-fetch')
const handleRedirect = require('./handleRedirect')

module.exports = acornRoute = async (acornRouteURL, httpMethod, bodyData, routeName, cookieJar) => {
    return await fetch(acornRouteURL, {
        method: httpMethod,
        headers: {
            cookie: cookieJar.getCookieStringSync(acornRouteURL),
            body: bodyData
        }
    })
    .then(response => handleRedirect(response, cookieJar))
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        throw new Error("(in " + routeName + " route): "+error)
    })
}