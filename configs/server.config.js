/**
 * We will try to read the port
 * process.env ==> nativilly avaialbe in the node.js (node inbuild) 
 * process.env help us to read the node.js process related information which is 
 * running on the machine 
 */

if(process.env.NODE_ENV != 'production'){

    require('dotenv').config();
    //this will read the .env file and set the PORT as 8080 which we define in the 
    //.env file
}

module.exports = {
    PORT : process.env.PORT
}

