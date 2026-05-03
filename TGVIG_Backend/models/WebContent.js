const mongoose = require("mongoose");

const webContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true, // 🔥 one document per section
    },

    content: {
      type: mongoose.Schema.Types.Mixed, // flexible JSON
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebContent", webContentSchema);