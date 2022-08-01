/**
 * this file will contain the custom middle ware for verifying the 
 * request body 
 * 
 * below next will use the pass the control to next middle ware or next controller
 * 
 */

const User = require("../models/user.model");
const constant = require("../utils/constants");

validateSignupRequest = async (req, res, next) => {

    //validate if userName exists
    if(!req.body.name){
        return res.status(400).send({
            message : "Faield ! User name is not provided"
        })
    }
 
    //validate if the userId exists
    if(!req.body.userId){
        return res.status(400).send({
            message : "Faield ! User Id is not provided"
        })
    }

    /**
     * validate if the userid already not presend
     */
    const user = await User.findOne({userId : req.body.userId});

    if(user != null){
        return res.status(400).send({
            message : "Failed ! User Id already exist"
        })
    }

    //validate if the password exists
    if(!req.body.password){
        return res.status(400).send({
            message : "Failed ! Password is not provided"
        })
    }

    //validate if the email exists
    if(!req.body.email){
        return res.status(400).send({
            message : "Failed ! Email is not provided" 
        })
    }

    /**
     * in the schema we have define tht the email id should be unique
     * So we will check whether email id already present or not
     */

    const email = await User.findOne({email : req.body.email});

    if(email != null){
        return res.status(400).send({
            message : "Failed ! email Id already exists"
        })
    }

    /**
     * We will do the validation for the user type as well
     * So if any body provide the user then it should belongs to below user
     * ["CUSTOMER" , "ENGINEER", "ADMIN"]
     * 
     * if userType is not provided then we will select the default value 
     * that is Customer but if is not null then I will check the user type 
     * 
     * if we provided the userTypes and it in not the correct user then 
     * we will return the bad request
     */

    const userType = req.body.userType;
    const userTypes = [constant.userType.customer, constant.userType.engineer,
                        constant.userType.admin]

    if(userType &&  !userTypes.includes(userType)){
        return res.status(400).send({
            message : "Failed ! User Type is not correctly provided "
        })
    }


    // give the controll to the controller
    next();

    /**
     * Scope of improving the code :
     * 
     * validate if the email id is in correct format 
     */
}


module.exports = {

    validateSignupRequest : validateSignupRequest
}