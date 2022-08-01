const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");

/**
 * We will do the
 * Authentication
 *          -If the token passed is valid or not
 * 
 * 1. If no token is passed in the request header - Not allowed
 * 2. if token is passed : Authnticated
 *          if correct allow, else reject
 */


/**
 * If userTyep is ADMIN that not mean it can call the API to fine all users
 * We will verfity whether it is valid ADMIN or not
 * To do this first we will check whther userId present in the db or not
 * If it is present then we will compare the password
 * If pssword also valid then it will generate the access token 
 * if access token generated then we will allow ADMIN user to call the api
 * 
 * Here we are useing access token because if ADMIn forget to logout then 
 * also after few seconds his/her session will be expired
 */


verifyToken = (req, res, next) => {
    /**
     * Read the token from header
     */
    const token = req.headers['x-access-token'];

    /**
     * Question: 
     * Here why we are reading the access token form header and how we can provide 
     * the access token in the header ?
     * Here we can check whether the userId is present in the Db and also 
     * we can check whether the password is valid or not 
     * if password is valid and user is Admin then we can pass the request 
     * to controller 
     * 
     * So why we need to read the "x-access-token" from header
     */

    if(!token){
        return res.status(403).send({
            message : "No token provided"
        })
    }

    //if the token was provided, we need to verity it 
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message : "Unauthorized"
            })
        }

        //I will try to read the userId from the decoded token and store it 
        //in the req object

        req.userId = decoded.id;

        next();
    })
};

/**
 * If the passed access token is of ADMIN or not
 */

isAdmin = async(req, res, next) => {

    /**
     * Fetch the user from the DB using the userId
     */

    const user = await User.findOne({userId : req.userId});

    /**
     * check what is the user type
     */

    if(user && user.userType == constants.userType.admin){
        next();
    }
    else {
        res.status(403).send({
            message : "Requires ADMIN role"
        })
    } 
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}

module.exports = authJwt
