const router = require("express").Router();
const ctrl = require("../controllers/tableBookingController");

router.post("/", ctrl.createBooking);
router.get("/", ctrl.getBookings);

// ADD THESE
router.put("/:id", ctrl.updateBooking);
router.delete("/:id", ctrl.deleteBooking);

module.exports = router;