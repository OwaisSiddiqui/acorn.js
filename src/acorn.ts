import tough from 'tough-cookie'
import login from './login'
import logout from './logout'
import acornRoute from './acornRoute'

module.exports = class Acorn {
    cookieJar: tough.CookieJar
    isLoggedIn: boolean
    utorid: string
    utoridPassword: string
    
    constructor(utorid: string, utoridPassword: string) {
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

    getStudentBasicInfo = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/profile/studentBasicInfo", "GET", "studentBasicInfo", this.cookieJar)
    }
    
    getMailingAddress = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/tc/mailingAddress", "GET", "mailingAddress", this.cookieJar)
    }
    
    getTodayStartDateForARTSC = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/acorn-config/is-today-peak-load", "GET", "todayStartDateForARTSC", this.cookieJar)
    }
    
    getStudentAwards = async (sessionCode: string) => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/invoice?sessionCode=" + sessionCode, "GET", "studentAwards", this.cookieJar)
    }
    
    // See Sessions and Sub-Sessions section of https://www.sis.utoronto.ca/wp-content/uploads/StudyGuides-Intro.pdf
    getStudentAttendanceInfo = async (sessionCode: string) => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/awards/attendance?sessionCode=" + sessionCode, "GET", "studentAttendanceInfo", this.cookieJar)
    }
    
    getCOEParticipatingOrgs = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/acorn-config/coe-participating-orgs", "GET", "COEParticipatingOrgs", this.cookieJar)
    }
    
    getGlobalMessage = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/acorn-config/global-message", "GET", "globalMessage", this.cookieJar)
    }
    
    getFeatureConfigs = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/acorn-config/feature-configs", "GET", "featureConfigs", this.cookieJar)
    }
    
    getEmailAddress = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/profile/email", "GET", "emailAddress", this.cookieJar)
    }
    
    getDomesticStudent = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/profile/domesticStudent", "GET", "domesticStudent", this.cookieJar)
    }
    
    getAccountBalanceFromMainframe = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/finance/mainframe-accountBalance", "GET", "accountBalanceFromMainframe", this.cookieJar)
    }
    
    getStudentEnrolledCourses = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/courseRegistration/enrolledCourses", "GET", "studentEnrolledCourses", this.cookieJar)
    }
    
    getTodaysEvents = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/eventCalendar/getDashboardEvents/TODAY", "GET", "todaysEvents", this.cookieJar)
    }
    
    getUpcomingEvents = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/eventCalendar/getUpcomingEvents", "GET", "upcomingEvents", this.cookieJar)
    }
    
    getStartTimes = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/course/start-times", "GET", "startTimes", this.cookieJar)
    }
    
    getDeData = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/programProgress", "GET", "deData", this.cookieJar)
    }
    
    getCurrentDate = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/eventCalendar/getCurrentDate/yyyy-MM-dd", "GET", "currentDate", this.cookieJar)
    }
    
    getCurrentRegistrations = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/current-registrations", "GET", "currentRegistrations", this.cookieJar)
    }
    
    getPostsWithInviteStatus = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/posts-with-invite-status", "GET", "postsWithInviteStatus", this.cookieJar)
    }
    
    getCNCTotal = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/cnc/total-credits", "GET", "CNCTotal", this.cookieJar)
    }

    getTermCourseLoad = async (primaryOrgCode: string, postCode: string, sessionCodes: Array<string>) => {
        var qparams = "primaryOrgCode=" + encodeURIComponent(primaryOrgCode) + "&postCode=" + encodeURIComponent(postCode)
        var len = sessionCodes.length
        var i = 0
        for (; i < len; i++) {
            qparams = qparams + ("&sessionCodes=" + encodeURIComponent(sessionCodes[i]));
        }
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/term-course-loads?"+qparams, "GET", "termCourseLoad", this.cookieJar)
    }

    getActiveActionNotices = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/notification/action-notice", "GET", "activeActionNotices", this.cookieJar)
    }
    
    getDentalOptOutSessionCode = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/dashboard/finance/dentalOptOutSessionCode", "GET", "dentalOptOutSessionCode", this.cookieJar)
    }
    
    getEligibleRegistrations = async () => {
        return await acornRoute("https://acorn.utoronto.ca/sws/rest/enrolment/eligible-registrations", "GET", "eligibleRegistrations", this.cookieJar)
    }
}