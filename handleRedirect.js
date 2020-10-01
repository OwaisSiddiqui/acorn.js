const fetch = require('node-fetch')

module.exports =  handleRedirect = (response, cookieJar) => {
    return new Promise((resolve, reject) => {
        var headers = response.headers.raw()
        var cookies = headers['set-cookie']
        if (cookies) {
            cookies.forEach((cookie) => {
                cookieJar.setCookie(cookie, response.url, (error, cookie) => {
                    if (error) throw new Error("Failed to setCookie.")
                })
            })
        }
        var location = headers['location'] && headers['location'][0]
        if (location) {
            var cookieString = null
            cookieJar.getCookieString(location, (error, cookies) => {
                if (error) throw new Error("Failed to getCookieString.")
                cookieString = cookies
            })
            fetch(location, {
                "redirect": "manual",
                headers: {
                    cookie: cookieString
                }
            })
                .then(response => {
                    resolve(response)
                })
                .catch(error => reject(error))
        } else {
            return resolve(response)
        }
    })
        .then(response => {
            return response.headers.raw()['location'] && response.headers.raw()['location'][0] ? handleRedirect(response, cookieJar) : response
        })
        .catch(error => console.log("Redirect Promise Error: "+error))
}