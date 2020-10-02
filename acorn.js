const tough = require('tough-cookie')
const login = require('./login')
const logout = require('./logout')
const acornRoute = require('./acornRoute')

module.exports = class Acorn {
    constructor(utorid, utoridPassword) {
        /* To store cookies when logging in, this is so accessing GET requests link
           don't return the login page */
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

    studentBasicInfo = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/profile/studentBasicInfo", "GET", {}, "studentBasicInfo", this.cookieJar)
    }
    
    mailingAddress = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/tc/mailingAddress", "GET", {}, "mailingAddress", cookieJar)
    }
    
    todayStartDateForARTSC = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/acorn-config/is-today-peak-load", "GET", {}, "todayStartDateForARTSC", this.cookieJar)
    }
    
    studentAwards = async (sessionCode) => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/invoice?sessionCode=" + sessionCode, "GET", {}, "studentAwards", this.cookieJar)
    }
    
    // See Sessions and Sub-Sessions section of https://www.sis.utoronto.ca/wp-content/uploads/StudyGuides-Intro.pdf
    studentAttendanceInfo = async (sessionCode) => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/awards/attendance?sessionCode=" + sessionCode, "GET", {}, "studentAttendanceInfo", this.cookieJar)
    }
    
    COEParticipatingOrgs = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/acorn-config/coe-participating-orgs", "GET", {}, "COEParticipatingOrgs", this.cookieJar)
    }
    
    globalMessage = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/acorn-config/global-message", "GET", {}, "globalMessage", this.cookieJar)
    }
    
    featureConfigs = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/acorn-config/feature-configs", "GET", {}, "featureConfigs", this.cookieJar)
    }
    
    emailAddress = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/profile/email", "GET", {}, "emailAddress", this.cookieJar)
    }
    
    domesticStudent = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/profile/domesticStudent", "GET", {}, "domesticStudent", this.cookieJar)
    }
    
    studentAccountBalance = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/profile/ ", "GET", {}, "studentAccountBalance", cookieJar)
    }
    
    accountBalanceFromMainframe = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/finance/mainframe-accountBalance", "GET", {}, "accountBalanceFromMainframe", this.cookieJar)
    }
    
    studentEnrolledCourses = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/courseRegistration/enrolledCourses", "GET", {}, "studentEnrolledCourses", this.cookieJar)
    }
    
    todaysEvents = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/eventCalendar/getDashboardEvents/TODAY", "GET", {}, "todaysEvents", this.cookieJar)
    }
    
    upcomingEvents = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/eventCalendar/getUpcomingEvents", "GET", {}, "upcomingEvents", this.cookieJar)
    }
    
    startTimes = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/course/start-times", "GET", {}, "startTimes", this.cookieJar)
    }
    
    deData = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/programProgress", "GET", {}, "deData", this.cookieJar)
    }
    
    currentDate = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/eventCalendar/getCurrentDate/yyyy-MM-dd", "GET", {}, "currentDate", this.cookieJar)
    }
    
    currentRegistrations = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/current-registrations", "GET", {}, "currentRegistrations", this.cookieJar)
    }
    
    postsWithInviteStatus = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/posts-with-invite-status", "GET", {}, "postsWithInviteStatus", this.cookieJar)
    }
    
    CNCTotal = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/cnc/total-credits", "GET", {}, "CNCTotal", this.cookieJar)
    }
    
    termCourseLoad = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/term-course-loads", "GET", {}, "termCourseLoad", this.cookieJar)
    }
    
    heartbeatStatus = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/admin/heartbeat", "GET", {}, "startTimes", this.cookieJar)
    }
    
    activeActionNotices = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/notification/action-notice", "GET", {}, "activeActionNotices", this.cookieJar)
    }
    
    dentalOptOutSessionCode = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/finance/dentalOptOutSessionCode", "GET", {}, "dentalOptOutSessionCode", this.cookieJar)
    }
    
    eligibleRegistrations = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/eligible-registrations", "GET", {}, "eligibleRegistrations", this.cookieJar)
    }
}