/**
 * I will have the logic to transform the object
 */

exports.userResponse = (users) => {

    userResponse = [];

    users.forEach( user => {
        userResponse.push({
            name : user.name, 
            userId : user.userId, 
            email : user.email, 
            userType : user.userType, 
            userStatus : user.userStatus
        });
    })


    return userResponse;
}

exports.ticketCreationResponse = (ticket) => {

    return {
        ticketId : ticket._id,
        title : ticket.title,
        ticketPriority : ticket.ticketPriority,
        createdAt : ticket.createdAt, 
        updatedAt : ticket.updatedAt, 
        description : ticket.description, 
        ticketStatus : ticket.ticketStatus, 
        reporter : ticket.reporter, 
        assignee : ticket.assignee
    }
}