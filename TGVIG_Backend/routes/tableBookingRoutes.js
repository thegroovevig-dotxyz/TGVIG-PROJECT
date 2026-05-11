router.get("/", ctrl.getBookings);
router.post("/", ctrl.createBooking);
router.put("/:id", ctrl.updateBooking);
router.delete("/:id", ctrl.deleteBooking);