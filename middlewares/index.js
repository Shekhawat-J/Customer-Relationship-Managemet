/**
 * We will write so many middle ware so insted of require all the middle ware 
 * in the different different file
 * We will require the all the middle ware in index.js file 
 * and this index.js file will be expose to other files if those files 
 * want to use the middle ware 
 */

/**
 * why we are using index.js  
 */
const verifySignUp = require("./verifySignUp");
const authJwt = require("../middlewares/authjwt");

module.exports = {
    verifySignup : verifySignUp, 
    authJwt : authJwt
}