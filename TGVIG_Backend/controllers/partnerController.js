const Partner = require("../models/Partner");
const Member = require("../models/Member");


// 🤝 REGISTER PARTNER
exports.registerPartner = async (req, res) => {
  try {

    const memberId = req.user._id;

    const {
      businessName,
      type,
      bankDetails
    } = req.body;

    const existing = await Partner.findOne({ memberId });

    if (existing) {
      return res.status(400).json({
        message: "Partner already exists"
      });
    }

    const partner = await Partner.create({
      memberId,
      businessName,
      type,
      bankDetails,
      approvalStatus: "PENDING"
    });

    await Member.findByIdAndUpdate(memberId, {
      role: "PARTNER"
    });

    res.json({
      success: true,
      partner
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 🤝 GET MY PARTNER PROFILE
exports.getMyPartner = async (req, res) => {
  try {

    const memberId = req.user._id;

    const partner = await Partner.findOne({ memberId });

    res.json({
      success: true,
      partner
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    res.json({
      updated: true
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};