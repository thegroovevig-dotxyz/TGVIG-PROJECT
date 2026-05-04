const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(uri);

    console.log("✅ MongoDB CONNECTED");
  } catch (err) {
    console.error("❌ MongoDB ERROR:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;