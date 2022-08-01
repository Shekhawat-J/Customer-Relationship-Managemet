const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");


/**
 * Controller for signup/Registraion
 */
exports.signup = async (req, res) => {

    var userStatus = req.body.userStatus;

    if(!req.body.userStatus){
        //defauld user will be CUSTOMER
        //Writing the string literal directly in the code is not good practice
        //So we will create a package called as utils 
        //in utils we a file constandts.js

        if(!req.body.userType || req.body.userType == constants.userType.customer){
            userStatus = constants.userStatus.approved;
        }
        else{
            userStatus = constants.userStatus.pending;
        } 
    }

    const userObjToBeStoredInDB = {
        name : req.body.name, 
        userId : req.body.userId, 
        email : req.body.email, 
        userType : req.body.userType, 
        password : bcrypt.hashSync(req.body.password, 8), 
        userStatus : userStatus
    }

    /**
     * insert this new user to the db
     */

    try{
        const userCreated = await User.create(userObjToBeStoredInDB);

        console.log("User Created ", userCreated);
        /**
     * Now we need to return the response
     * But in the response we will not return the password 
     */

        const userCreationResponse = {
            name : userCreated.name, 
            userID : userCreated.userId, 
            email : userCreated.email, 
            userType : userCreated.userType, 
            userStatus : userCreated.userStatus, 
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }

        res.status(201).send(userCreationResponse);
    }
    catch(err){
        console.error("Error while inserting the user in the DB", err.message);
        res.status(500).send({
            message : "Internal error while inserting the user in DB"
        })
    }

};


/**
 * controller for signin/Login
 */

exports.signin = async (req, res) =>{

    //check whether the user present of not 

    const user = await User.findOne({userId : req.body.userId});

    //if user does not exits
    if(user ==  null){
        return res.status(400).send({
            message : "Failed ! User id doesn't exits"
        })
    }

    /**
     * Check whether the userStatus is approved or pending
     */

    if(user.userStatus != constants.userStatus.approved){
        return res.status(200).send({
            message : "User not allow to login because user Status is Pending"
        })
    }


    //if user id present the we will match the password

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if(!isPasswordValid){
        return res.status(401).send({
            message : "Password is not valid"
        })
    }

    //** Successfully Login */
    //I need to generate access token now

    const token = jwt.sign({id:user.userId}, authConfig.secret, {expiresIn : 600});

    res.status(201).send({
        name: user.name, 
        userId : user.userId, 
        email : user.email, 
        userType : user.userType, 
        userStatus : user.userStatus, 
        accessToken : token
    })

};