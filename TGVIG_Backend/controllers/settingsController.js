const Settings = require("../models/Settings");

// GET SETTINGS
exports.getSettings = async (req, res) => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({
      notifications: {
        welcome: { subject: "Welcome", message: "Welcome to TGVIG" },
        receipt: { subject: "Receipt", message: "Thank you for your purchase" },
        topup: { subject: "Top-up", message: "Wallet updated" },
        coupon: { subject: "Coupon", message: "New coupon available" }
      }
    });
  }

  res.json(settings);
};

// UPDATE SETTINGS (ADMIN ONLY)
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

