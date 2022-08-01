/**
 * This file will hold the schema for the User resource  
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    }, 

    userId : {
        type : String, 
        required : true, 
        unique : true
    }, 

    password : {
        type : String, 
        required : true 
    }, 

    email : {
        type : String, 
        required : true, 
        lowercase : true, 
        minLength : 10, 
        unique : true 
    }, 

    createdAt : {
        type : Date, 
        default : () => {
            return Date.now();
        }, 
        immutable : true 
    }, 

    updatedAt : {
        type : Date, 
        default : () => {
            return Date.now();
        }
    }, 

    //Mongoose has serveral inbuild validators. Strings have enum as one of the validators
    userType : {
        type : String, 
        required : true,
        default : "CUSTOMER"
        //enum : ['ADMIN', 'ENGINEER', 'CUSTOMER']
    }, 

    userStatus : {
        type : String, 
        required : true, 
        default : "APPROVED"
        //enum : ['Pending', 'Approved', 'Rejected']
    }, 

    ticketCreated : {
        type : [mongoose.SchemaType.ObjectId],
        ref : "Ticket"
    }, 

    ticketAssigned : {
        type : [mongoose.SchemaType.ObjectId], 
        reg : "Ticket"
    }
});

module.exports = mongoose.model('User', userSchema);

