/**
 * Here we will define the schema for Ticket Resource
 */

const mongoose = require("mongoose");
const constants = require("../utils/constants");

const ticketSchema = new mongoose.Schema({
    
    title :{ 
        type : String, 
        required : true
    },

    ticketPriority : { 
        type : Number, 
        required : true, 
        default : constants.ticketPriority.four
         //Possible values : 1/2/3/4
    },

    createdAt : { 
        type : Date, 
        default : () =>{
            return Date.now();
        },
        immuatable : true
    },

    updatedAt :{ 
        type : Date, 
        default : () => {
            return Date.now();
        }
    },

    description :{ 
        type : String, 
        required :true
    },

    reporter :{ 
        type : String
    },

    assignee :{ 
        type : String
    },

    ticketStatus :{ 
        type :String, 
        required : true,
        default : constants.ticketStatus.open
    }
});

module.exports = mongoose.model("Ticket", ticketSchema);

