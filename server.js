const express = require("express");
//my port in config file so I will require config files as well
const serverConfig = require('./configs/server.config');
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const bodyParser = require("body-parser");
const bcrypt =  require("bcryptjs");
const User = require("./models/user.model");

const app = express();

//to user the body parser on it full potential
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Setup the mongodb connection and create an ADMIN user
 * Database URL will be different - 2 on dev, prod machine 
 * So we will define the DB URL in config file
 */
mongoose.connect(dbConfig.DB_URL, () => {
    console.log("Connected to MongoDB");

    //initialization
    init();

}, (err) => {
    console.log("Error", err.message);
})


async function init(){
    //We only one time want to create the Admin user
    var user = await User.findOne({userId : "admin"});

    
    if(user){
        return;
    }
    else {
        //Create the admin user
        const user = await User.create({
            name : "Kailash",
            userId : "admin",
            email : "kais@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("welcome01",8)
        })

        console.log("Admin user is created");
    }

}

require('./routes/auth.routes')(app); 
require('./routes/user.routes')(app);
require('./routes/ticket.routes')(app);
/**
 * Start the express server
 */

app.listen(serverConfig.PORT, () =>{
    console.log("Application has started on the port", serverConfig.PORT);
})

