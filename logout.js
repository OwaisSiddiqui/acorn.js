const fetch = require('node-fetch')
const handleRedirect = require('./handleRedirect')

module.exports = logout = async (isLoggedIn, cookieJar) => {
    if (isLoggedIn) {
        return await fetch("https://acorn.utoronto.ca/sws/auth/logout", {
            headers: {
                cookie: cookieJar.getCookieStringSync("https://acorn.utoronto.ca/sws/auth/logout")
            }
        })
        .then(response => handleRedirect(response, cookieJar))
        .then(response => {
            cookieJar.removeAllCookiesSync()
            return false
        })
        .catch(error => {
            throw new Error("(in logout route): "+error)
        })
    } else {
        throw new Error("(in logout route): Not logged in and so cannot logout.")
    }
}