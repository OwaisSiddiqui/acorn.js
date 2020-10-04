import { CookieJar } from 'jsdom'
import fetch from 'node-fetch'
import handleRedirect from './handleRedirect'

const logout = async (isLoggedIn: boolean, cookieJar: CookieJar) => {
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

export default logout