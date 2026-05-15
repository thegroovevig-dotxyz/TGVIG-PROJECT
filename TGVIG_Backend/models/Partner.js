const partnerSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },

  businessName: String,

  type: {
    type: String,
    enum: ["HOTEL", "GUESTHOUSE", "PARKING"]
  },

  location: {
    address: String,
    lat: Number,
    lng: Number
  },

  roomsAvailable: Number,
  parkingSpaces: Number,

  documents: {
    registration: String,
    proofOfAddress: String
  },

  payoutDetails: {
    bankName: String,
    accountNumber: String
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  }
}, { timestamps: true });

module.exports = mongoose.model("Partner", partnerSchema);