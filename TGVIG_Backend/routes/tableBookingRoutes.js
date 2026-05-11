const router = require("express").Router();
const ctrl = require("../controllers/tableBookingController");

router.get("/", ctrl.getBookings);
router.post("/", ctrl.createBooking);
router.put("/:id", ctrl.updateBooking);
router.delete("/:id", ctrl.deleteBooking);

module.exports = router;