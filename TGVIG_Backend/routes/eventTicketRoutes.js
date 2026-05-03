const router = require("express").Router();
const ctrl = require("../controllers/eventTicketController");

router.post("/", ctrl.createTicket);
router.get("/", ctrl.getTickets);
router.post("/buy", ctrl.buyTicket);

module.exports = router;