const Driver = require("../models/Driver");
const Member = require("../models/Member");
const Partner = require("../models/Partner");
const Property = require("../models/Property");

// 🚗 APPROVE DRIVER
exports.approveDriver = async (req, res) => {
  try {

    const { driverId } = req.body;

    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found"
      });
    }

    driver.status = "APPROVED";
    await driver.save();

    await Member.findByIdAndUpdate(driver.memberId, {
      role: "DRIVER"
    });

    res.json({
      success: true,
      message: "Driver approved"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 🚗 REJECT DRIVER
exports.rejectDriver = async (req, res) => {
  try {

    const { driverId } = req.body;

    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found"
      });
    }

    driver.status = "REJECTED";
    await driver.save();

    res.json({
      success: true,
      message: "Driver rejected"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 🤝 APPROVE PARTNER
exports.approvePartner = async (req, res) => {
  try {

    const { partnerId } = req.body;

    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(404).json({
        message: "Partner not found"
      });
    }

    partner.approvalStatus = "APPROVED";
    await partner.save();

    res.json({
      success: true,
      message: "Partner approved"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 🤝 REJECT PARTNER
exports.rejectPartner = async (req, res) => {
  try {

    const { partnerId } = req.body;

    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(404).json({
        message: "Partner not found"
      });
    }

    partner.approvalStatus = "REJECTED";
    await partner.save();

    res.json({
      success: true,
      message: "Partner rejected"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// 🏨 APPROVE PROPERTY
exports.approveProperty = async (req, res) => {
  try {

    const { propertyId } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    property.status = "ACTIVE";
    await property.save();

    res.json({
      success: true,
      message: "Property approved"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 🏨 REJECT PROPERTY
exports.rejectProperty = async (req, res) => {
  try {

    const { propertyId } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    property.status = "REJECTED";
    await property.save();

    res.json({
      success: true,
      message: "Property rejected"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

exports.getSystemSummary = async (req, res) => {
  try {

    const summary = {
      message: "System summary endpoint working",
      timestamp: new Date()
    };

    res.json({
      success: true,
      summary
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};