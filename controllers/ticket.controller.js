/**
 * We will write the API to handle the tickets
 */

/**
 * 1. create a ticket 
 *      v1 -> Any one should be able to create the ticket
 * 
 */

const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");
const objectConverter = require("../utils/objectConverter");

exports.createTicket = async (req, res) => {
    //logic to create the ticket 
    try {
        const ticketObjToBeCreated = {
            title : req.body.title, 
            description : req.body.description, 
            ticketPriority : req.body.ticketPriority
        }

        /**
         * I will check if any engineer is avialable 
         */ 

        const engineer = User.findOne({
            userType : constants.userType.engineer, 
            userStatus : constants.userStatus.approved
        })

        if(engineer){
            ticketObjToBeCreated.assignee = engineer.userId;
        }

        const ticket = await Ticket.create(ticketObjToBeCreated)

        if(ticket){
            //updating the ticket in the user model
            const reqUserId = req.userId;

            /** 
            When we user findOneAndUpdate() then it will not execute the 
            efine function 
          
            const updateUser = await User.findOneAndUpdate(
                {userId :reqUserId}, 
                {
                    "$push" : {ticketCreated : ticket._id}
                }
            );
            */
            
            const user = await User.findOne({userId : reqUserId});
            user.ticketCreated.push(ticket._id);
            await user.save();
        
            //updating the engineer document with the list of assing ticket

            engineer.ticketAssigned.push(ticket._id);
            await engineer.save();

            res.status(201).send(objectConverter.ticketCreationResponse(ticket));
        }
    } catch (err) {
        console.log("Error while creating the ticket")
        res.status(500).send(err.message);
    }
}