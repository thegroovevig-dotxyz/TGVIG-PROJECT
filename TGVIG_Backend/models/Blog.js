const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
    logo: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);