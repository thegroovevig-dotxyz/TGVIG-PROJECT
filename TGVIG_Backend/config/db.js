const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is NOT defined");
    }

    console.log("Using Mongo URI:", process.env.MONGO_URI);

    await mongoose.connect("mongodb+srv://thegrooveuploads_db_user:D95ZQIJTruwcWJq1@cluster0.qt8lr32.mongodb.net/tgvig");

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;