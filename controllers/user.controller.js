/**
 * This file will have all the login to manipulate the user resouce 
 */

/**
 * Fetch the list of all users
 *      -Only ADMIN is allowed to call this method
 *      -ADMIN should be able to filter based :
 *              1. Name
 *              2.  UserType
 *              3. UserStatus
 */

const { mongo } = require("mongoose");
const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");

exports.findAllUsers = async (req, res) => {
    /**
     * Here only we will add the filter vases on Name, userType and userstatus
     */
    
    //Read the data from the query param

    const nameReq = req.query.name;
    const userTypeReq = req.query.userType;
    const userStatusReq = req.query.userStatus;

    const mongoQueryObj = {}

    if(nameReq && userTypeReq && userStatusReq){
        mongoQueryObj.name = nameReq;
        mongoQueryObj.userType = userTypeReq;
        mongoQueryObj.userStatus = userStatusReq;
    }
    else if(nameReq && userTypeReq){
        mongoQueryObj.name = nameReq;
        mongoQueryObj.userType = userTypeReq
    }
    else if(nameReq && userStatusReq){
        mongoQueryObj.name = nameReq;
        mongoQueryObj.userStatus = userStatusReq;
    }
    else if(userTypeReq && userStatusReq){
        mongoQueryObj.userType = userTypeReq;
        mongoQueryObj.userStatus = userStatusReq;
    }
    else if(nameReq){
        mongoQueryObj.name = nameReq;
    }
    else if(userTypeReq){
        mongoQueryObj.userType = userTypeReq;
    }
    else if(userStatusReq){
        mongoQueryObj.userStatus = userStatusReq;
    }

    try {
        const users = await User.find(mongoQueryObj);
        //the below line will return the password as well but we should not return 
        //res.status(200).send(users);

        res.status(200).send(objectConverter.userResponse(users));
    }
    catch(err){
        console.log("Error", err.message);
        res.status(500).send({
            message : "Internal erroe while fetching all users"
        })
    }
};


/**
 * Fetch the user based on the userId 
 */

exports.findUserById = async (req, res) =>{
    /**
     * When I trying to find the user by Id then I'm expecting userId will be 
     * path of the path param
     */

    const userIdReq = req.params.userId; //Reading form the request parameter

    /**
     * objectCoverter.userResponse() take the array of the user as argument
     * So that's why we will user find() instead of findOne()
     * Becuase findOne() only return the one entry that is object not the 
     * array of object
     */
    
    const user = await User.find({userId : userIdReq});

    if(user){
        res.status(200).send(objectConverter.userResponse(user));
    }
    else{
        res.status(200).send({
            message : "User with id" + userIdReq + "Doesn't exist"
        })
    }
}



/**
 * update the user  - userStatus and userType
 *      -only ADMIN is allowed to call this method
 * 
 * ADMIN should provide the 
 * ->name , userStatus, userType
 */

exports.updateUser = async (req, res) =>{

    /**
     * One of the ways of updating
     */

    try {
        const userIdReq = req.params.userId;
        //findOneAndUpdate() will take two parameter one is to search the document 
        //second one to update the document and it will return the the document
        //as it was before update was applied.

        const user = await User.findOneAndUpdate(
            
            {userId : userIdReq},

            {
                name : req.body.name,
                userStatus : req.body.userStatus, 
                userType : req.body.userType
            }

    );
    
    //find the updated user using the userIdReq and return as resonse
    const updatedUser = await User.find({userId : userIdReq});

    res.status(200).send(objectConverter.userResponse(updatedUser));

    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message : "Internal server error while updating"
        })
    }
}