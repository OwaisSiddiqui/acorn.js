import fetch, { Response, Body} from 'node-fetch'
import tough from 'tough-cookie'

const handleRedirect = (response: Response, cookieJar: tough.CookieJar): Promise<void | Response | any> => {
    return new Promise((resolve, reject): void => {
        var headers = response.headers.raw()
        var cookies = headers['set-cookie']
        if (cookies) {
            cookies.forEach((cookie: string) => {
                cookieJar.setCookie(cookie, response.url, (error, cookie) => {
                    if (error) throw new Error("Failed to setCookie.")
                })
            })
        }
        var location = headers['location'] && headers['location'][0]
        if (location) {
            var cookieString = ""
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
            resolve(response)
        }
    })
        .then((response: Response | any) => {
            return response.headers.raw()['location'] && response.headers.raw()['location'][0] ? handleRedirect(response, cookieJar) : response
        })
        .catch(error => console.log("Redirect Promise Error: "+error))
}

export default handleRedirect