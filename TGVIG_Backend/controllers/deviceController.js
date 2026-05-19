const Device = require("../models/Device");

exports.createDevice = async (req, res) => {
  try {
    const { name, type, status, clubId } = req.body;

    console.log("DEVICE BODY:", req.body);

    if (!name || !type || !clubId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const allowedTypes = ["POS", "SELFPOS", "MINIPOS"];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid device type" });
    }

    const device = await Device.create({
      name,
      type,
      status: status || "ACTIVE",
      clubId,
    });

    res.json(device);

  } catch (err) {
    console.log("DEVICE CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate("clubId").populate("assignedStaffId");
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json({ message: "Device deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS (activate/deactivate)
exports.updateDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate("clubId")
    .populate("assignedStaffId");

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json(device);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};