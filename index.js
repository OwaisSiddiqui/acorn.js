const tough = require('tough-cookie')
const login = require('./login')
const logout = require('./logout')
const {studentBasicInfo, mailingAddress, todayStartDateForARTSC} = require('./acornRoutes')

module.exports = class Acorn {
    constructor(utorid, utoridPassword) {
        this.cookieJar = new tough.CookieJar(),
        this.isLoggedIn = false,
        this.utorid = utorid,
        this.utoridPassword = utoridPassword
    }

    login = async () => {
        this.isLoggedIn = await login(this.cookieJar, this.utorid, this.utoridPassword)
        return this
    }

    logout = async () => {
        this.isLoggedIn = await logout(this.isLoggedIn, this.cookieJar)
        return this
    }

    getMailingAddress = async () => {
        return await mailingAddress(this.cookieJar)
    }

    getStudentBasicInfo = async () => {
        return await studentBasicInfo(this.cookieJar)
    }

    getTodayStartDateForARTSC = async () => {
        return await todayStartDateForARTSC(this.cookieJar)
    }
}