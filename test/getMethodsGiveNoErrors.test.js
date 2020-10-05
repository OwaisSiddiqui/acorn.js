/* 
   This file can be run by using the command: npm run test.

   Update this file with new tests if you decide to make a pull request
   with significantly new features.

   You have to create a file called '.env' within this 'test' folder
   with UTORID=your-utorid on one line and
   with UTORID_PASSWORD=your-utorid-password on another.

   This file will then read the environment variables from the '.env' file.

   NEVER commit the '.env' as it contains your UTORid credentials. It is 
   already ignored through the .gitignore file but ALWAYS be sure when you 
   are commiting and then pushing.

   ALWAYS be extra cautious when creating tests for POST requests as 
   they can change your Acorn account information instantly. When making
   POST methods for the Acorn class, add as much error handling possible
   to make sure that the POST request does what it's supposed to do.
*/

require('dotenv').config({path: './test/.env'})
const acornjs = require('../build/acorn')

var acorn = new acornjs(process.env.UTORID, process.env.UTORID_PASSWORD)

acorn.login()
    .then(result => {
        return result.getStudentBasicInfo()
    })
    .then(data => {
        console.log(data)
        return acorn.getEligibleRegistrations()
    })
    .then(data => {
        console.log(data)
        return acorn.getDentalOptOutSessionCode()
    })
    .then(data => {
        console.log(data)
        return acorn.getActiveActionNotices()
    })
    .then(data => {
        console.log(data)
        return acorn.getCNCTotal()
    })
    .then(data => {
        console.log(data)
        return acorn.getPostsWithInviteStatus()
    })
    .then(data => {
        console.log(data)
        return acorn.getCurrentRegistrations()
    })
    .then(data => {
        console.log(data)
        return acorn.getCurrentDate()
    })
    .then(data => {
        console.log(data)
        return acorn.getDeData()
    })
    .then(data => {
        console.log(data)
        return acorn.getStartTimes()
    })
    .then(data => {
        console.log(data)
        return acorn.getUpcomingEvents()
    })
    .then(data => {
        console.log(data)
        return acorn.getTodaysEvents()
    })
    .then(data => {
        console.log(data)
        return acorn.getStudentEnrolledCourses()
    })
    .then(data => {
        console.log(data)
        return acorn.getAccountBalanceFromMainframe()
    })
    .then(data => {
        console.log(data)
        return acorn.getDomesticStudent()
    })
    .then(data => {
        console.log(data)
        return acorn.getEmailAddress()
    })
    .then(data => {
        console.log(data)
        return acorn.getFeatureConfigs()
    })
    .then(data => {
        console.log(data)
        return acorn.getGlobalMessage()
    })
    .then(data => {
        console.log(data)
        return acorn.getCOEParticipatingOrgs()
    })
    .then(data => {
        console.log(data)
        return acorn.getStudentAttendanceInfo("20209")
    })
    .then(data => {
        console.log(data)
        return acorn.getStudentAwards("20209")
    })
    .then(data => {
        console.log(data)
        return acorn.getTodayStartDateForARTSC()
    })
    .then(data => {
        console.log(data)
        return acorn.getMailingAddress()
    })
    .then(data => {
        console.log(data)
        return acorn.logout()
    })
    .catch(error => {
        console.log(error)
    })