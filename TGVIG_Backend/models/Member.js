const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const memberSchema = new mongoose.Schema(
  {
    // 🔑 SYSTEM ID
    membershipNo: {
      type: String,
      unique: true,
      sparse: true
    },

    // 👤 BASIC INFO
    firstName: String,
    lastName: String,

    idNumber: {
      type: String,
      unique: true,
      sparse: true
    },

    email: { type: String, unique: true, sparse: true },
    phone: String,

    nationality: String,
    address: String,

    // 🔐 AUTH
    password: String,

    pin: {
      type: String,
 
    },

    role: {
      type: String,
      enum: ["ADMIN", "STAFF", "MEMBER", "POS"],
      default: "MEMBER"
    },

    deviceId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Device",
},

position: {
  type: String,
  enum: ["OPERATOR", "MONITOR", "SELF_POS"]
},

    // 🏢 RELATION
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
    },

    // 💳 LOYALTY
    walletBalance: { type: Number, default: 0 },
    pointsBalance: { type: Number, default: 0 },

    tier: {
      type: String,
      enum: ["BRONZE", "SILVER", "GOLD", "VIP"],
      default: "BRONZE"
    },

    // 📱 DIGITAL
    membershipQR: String,
    referralCode: String,

    // ✅ STATUS
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "BLOCKED"],
      default: "ACTIVE"
    },

    // 🔐 VERIFICATION
    verificationCode: String,
    verificationExpires: Date,
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);



module.exports = mongoose.model("Member", memberSchema);