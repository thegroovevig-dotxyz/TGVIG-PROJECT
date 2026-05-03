const express = require("express");
const router = express.Router();

const {
  createDevice,
  getDevices,
   deleteDevice,
  updateDevice,
} = require("../controllers/deviceController");

router.post("/", createDevice);
router.get("/", getDevices);

router.delete("/:id", deleteDevice);
router.put("/:id", updateDevice);

module.exports = router;