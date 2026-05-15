const Driver = require("../models/Driver");
const Member = require("../models/Member");


// 🚗 REGISTER DRIVER
exports.registerDriver = async (req, res) => {
  try {

    const memberId = req.user._id;

    const {
      licenseNumber,
      licenseExpiry,
      vehicle
    } = req.body;

    // prevent duplicates
    const existing = await Driver.findOne({ memberId });

    if (existing) {
      return res.status(400).json({
        message: "Driver already exists"
      });
    }

    const driver = await Driver.create({
      memberId,
      licenseNumber,
      licenseExpiry,
      vehicle,
      status: "PENDING"
    });

    // upgrade role
    await Member.findByIdAndUpdate(memberId, {
      role: "DRIVER"
    });

    res.json({
      success: true,
      driver
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 🚗 UPDATE DRIVER STATUS (ONLINE/OFFLINE)
exports.updateStatus = async (req, res) => {
  try {

    const memberId = req.user._id;
    const { isOnline } = req.body;

    const driver = await Driver.findOneAndUpdate(
      { memberId },
      { isOnline },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found"
      });
    }

    res.json({
      success: true,
      driver
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 🚗 GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  try {

    const memberId = req.user._id;

    const driver = await Driver.findOne({ memberId });

    res.json({
      success: true,
      driver
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};