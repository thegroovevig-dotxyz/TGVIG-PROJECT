const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/tgvig");
    console.log("✅ MongoDB REAL CONNECTED");
  } catch (err) {
    console.error("❌ Mongo ERROR:", err);
  }
};


module.exports = connectDB;