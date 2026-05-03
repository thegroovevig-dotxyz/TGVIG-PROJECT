const mongoose = require("mongoose");

const eventTicketSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },

    venue: String,
    eventName: String,

    priceCash: Number,
    pricePoints: Number,

    rewards: {
      item: String,
      pointsBonus: Number,
    },

    startDate: Date,
    endDate: Date,

    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventTicket", eventTicketSchema);