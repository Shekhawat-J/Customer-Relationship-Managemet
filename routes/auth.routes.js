/**
 * This file will act as the route for the authentication and authorizaion
 */

//define the routes - REST endpoints for user registration
const authController = require("../controllers/auth.controller");
const {verifySignup} = require("../middlewares");

module.exports = (app) =>{

    //POST 127.0.0.1:8080/crm/api/v1/auth/signup
    /**
     * we need to add the middle ware between routes and controller
     * We can have multiple middle ware so we will associate middle ware with array
     * 
     */
    app.post("/crm/api/v1/auth/signup", [verifySignup.validateSignupRequest], authController.signup);

    //POST 127.0.0.1:8080/crm/api/v1/auth/signin 

    app.post("/crm/api/v1/auth/signin", authController.signin);
}