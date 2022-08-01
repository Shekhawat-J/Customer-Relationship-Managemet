/**
 * We will define the routes for the ticket
 */

const ticketController = require("../controllers/ticket.controller");
const {authJwt} = require("../middlewares/");

module.exports = (app) =>{

    //POST 127.0.0.1:8080/crm/api/v1/tickets/

    app.post("/crm/api/v1/tickets/", [authJwt.verifyToken], ticketController.createTicket);
}