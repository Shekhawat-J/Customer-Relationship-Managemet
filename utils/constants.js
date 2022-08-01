/**
 * this contains the constants to be used everywhere in the code
 */

module.exports = {
    userType : {
        customer : "CUSTOMER", 
        admin : "ADMIN", 
        engineer : "ENGINEER"
    }, 

    userStatus :{
        pending : "PENDING", 
        approved : "APPROVED", 
        rejected : "REJECTED"
    },

    ticketStatus : {
        closed : "CLOSED", 
        blocked : "BLOCKED",
        open : "OPEN"
    }, 

    ticketPriority :{
        one : 1, 
        two : 2, 
        three : 3, 
        four : 4
    }
}