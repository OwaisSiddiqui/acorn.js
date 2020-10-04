import jsdom from 'jsdom'
import fetch, { Headers } from 'node-fetch'
import handleRedirect from './handleRedirect'
import tough from 'tough-cookie'
import { URLSearchParams } from 'url'
import { Element, LinkedHTMLElement } from 'svg.js'

const { JSDOM } = jsdom
var redirectResponse = null

const login = async (cookieJar: tough.CookieJar, utorid: string, utoridPassword: string) => {
    // First go to the direct Acorn link to capture any cookies on redirect
    // "redirect": "manual" will stop and return the response object of the redirect link
    return await fetch("https://acorn.utoronto.ca/sws", {
        "redirect": "manual"
    })
    .then(response => {
        redirectResponse = response
        return handleRedirect(response, cookieJar)
    })
    .then(response => cookieJar.getCookieString(response.url))
    .then(cookieString => {
        return fetch("https://idpz.utorauth.utoronto.ca/idp/profile/SAML2/Redirect/SSO?execution=e1s1", {
            method: "POST",
            headers: new Headers({
                cookie: cookieString
            }),
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
        var data = results[0].status === "fulfilled" ? results[0].value : ""
        var cookieString = results[1].status === "fulfilled" ? results[1].value : ""
        const dom = new JSDOM(data)
        if (dom.window.document.getElementsByClassName("form-element form-error")) {
            Array.from(dom.window.document.getElementsByClassName("form-element form-error")).forEach((element: any) => {
                if (element.innerHTML === "The password you entered was incorrect.") {
                    throw new Error("The password you entered for the given UTORid was incorrect.")
                }
            })
        } else {
            throw new Error("Cookies were likely not handled properly.")
        }
        var SAMLResponse = dom.window.document.querySelector("input[name=SAMLResponse]").value  
        return fetch("https://acorn.utoronto.ca/spACS", {
            method: "POST",
            headers: new Headers({
                cookie: cookieString
            }),
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

export default login