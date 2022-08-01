/**
 * This file will act as the route to handle the user
 */

//define the routes - REST endpoints for user registration
const userController = require("../controllers/user.controller");
const {authJwt} = require("../middlewares");

module.exports = (app) => {

    //GET 127.0.0.1:8080/crm/api/v1/users/

    app.get("/crm/api/v1/users/",[authJwt.verifyToken, authJwt.isAdmin], userController.findAllUsers);

    //GET 127.0.0.1:8080/crm/api/v1/users/{userId}
    app.get("/crm/api/v1/users/:userId", [authJwt.verifyToken], userController.findUserById);


    //PUT 127.0.0.1:8080/crm/api/v1/users/{userId}
    app.put("/crm/api/v1/users/:userId", [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser);

}