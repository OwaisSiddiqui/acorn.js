import fetch, { Headers } from 'node-fetch'
import tough from 'tough-cookie'
import handleRedirect from './handleRedirect'

var responseText = {}

const acornRoute = async (acornRouteURL: string, httpMethod: string, routeName: string, cookieJar: tough.CookieJar) => {
    return await fetch(acornRouteURL, {
        method: httpMethod,
        headers: new Headers({
            cookie: cookieJar.getCookieStringSync(acornRouteURL)
        })
    })
    .then(response => handleRedirect(response, cookieJar))
    .then((response: any) => response.json())
    .then((data: JSON) => {
        responseText = data
        return data
    })
    .catch(error => {
        console.log("Error response text:")
        console.log(responseText)
        throw new Error("(in " + routeName + " route): "+error)
    })
}

export default acornRoute