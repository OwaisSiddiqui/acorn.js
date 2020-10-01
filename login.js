const jsdom = require("jsdom")
const fetch = require('node-fetch')
const handleRedirect = require('./handleRedirect')

const { JSDOM } = jsdom

module.exports = login = async (cookieJar, utorid, utoridPassword) => {
    return await fetch("https://acorn.utoronto.ca/sws", {
        "redirect": "manual"
    })
    .then(response => handleRedirect(response, cookieJar))
    .then(response => Promise.allSettled([response, cookieJar.getCookieString(response.url)]))
    .then(results => {
        var cookieString = results[1].value
        return fetch("https://idpz.utorauth.utoronto.ca/idp/profile/SAML2/Redirect/SSO?execution=e1s1", {
            method: "POST",
            headers: {
                cookie: cookieString
            },
            body: new URLSearchParams({
                "$csrfToken.getParameterName()": "$csrfToken.getToken()",
                "j_username": utorid,
                "j_password": utoridPassword,
                "_eventId_proceed": ""
            }),
            "redirect": "manual"
        })
    })
    .then(response => handleRedirect(response, cookieJar))
    .then(response => Promise.allSettled([response.text(), cookieJar.getCookieString("https://acorn.utoronto.ca/spACS")]))
    .then(results => {
        var data = results[0].value
        var cookieString = results[1].value
        const dom = new JSDOM(data)
        if (dom.window.document.getElementsByClassName("form-element form-error")) {
            Array.from(dom.window.document.getElementsByClassName("form-element form-error")).forEach((element) => {
                if (element.innerHTML === "The password you entered was incorrect.") {
                    throw new Error("The password you entered for the given UTORid was incorrect.")
                }
            })
        }
        var SAMLResponse = dom.window.document.querySelector("input[name=SAMLResponse]").value  
        return fetch("https://acorn.utoronto.ca/spACS", {
            method: "POST",
            headers: {
                cookie: cookieString
            },
            body: new URLSearchParams({
                "SAMLResponse": SAMLResponse
            }),
            "redirect": "manual"
        })
    })
    .then(response => handleRedirect(response, cookieJar))
    .then(response => response.text())
    .then(data => {
        const dom = new JSDOM(data)
        if (dom.window.document.querySelector("title").innerHTML === "ACORN") {
            return true
        } else {
            throw new Error("Failed to login. This is likely due to cookies not being handled properly.")
        }
    })
    .catch(error => {
        throw new Error("(in login route): "+error)
    })
}