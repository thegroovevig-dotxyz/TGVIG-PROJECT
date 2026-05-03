const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  subject: String, // email only
  message: String, // supports variables
});

const settingsSchema = new mongoose.Schema({
  logo: String,
  systemName: String,

  notifications: {
    welcome: templateSchema,
    purchase: templateSchema,
    topup: templateSchema,
    booking: templateSchema,
    ticket: templateSchema,
    coupon: templateSchema,
  },
});

module.exports = mongoose.model("Settings", settingsSchema);