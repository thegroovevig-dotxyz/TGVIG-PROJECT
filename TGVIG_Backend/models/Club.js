const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    // 🏷️ BASIC INFO
    name: {
      type: String,
      required: true
    },

    location: String,
    address: String,

    // 🖼️ DISPLAY / CMS
    logo: String,
coverImage: String,
    image: String,
    blog: String,

    branding: {
  logo: String,
  banner: String,
  slogan: String,
  headerText: String,
},

    // 🍽️ RELATIONS
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
      }
    ],

    // 🎉 PROMOTIONS
    promotions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promotion"
      }
    ],

    // 👥 MEMBERS (optional for fast access)
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
      }
    ],

    // 📊 STATUS
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Club", clubSchema);