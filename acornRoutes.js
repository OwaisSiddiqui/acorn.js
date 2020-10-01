const acornRoute = require('./acornRoute')

studentBasicInfo = (cookieJar) => {
    return acornRoute("https://acorn.utoronto.ca/sws/rest/profile/studentBasicInfo", "GET", {}, "studentBasicInfo", cookieJar)
}

mailingAddress = (cookieJar) => {
    return acornRoute("https://acorn.utoronto.ca/sws/rest/tc/mailingAddress", "GET", {}, "mailingAddress", cookieJar)
}

todayStartDateForARTSC = (cookieJar) => {
    return acornRoute("https://acorn.utoronto.ca/sws/rest/acorn-config/is-today-peak-load", "GET", {}, "todayStartDateForARTSC", cookieJar)
}

module.exports = {studentBasicInfo, mailingAddress, todayStartDateForARTSC}