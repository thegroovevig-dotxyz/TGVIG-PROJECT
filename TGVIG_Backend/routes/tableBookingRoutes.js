const router = require("express").Router();
const ctrl = require("../controllers/tableBookingController");

router.post("/", ctrl.createBooking);
router.get("/", ctrl.getBookings);

module.exports = router;