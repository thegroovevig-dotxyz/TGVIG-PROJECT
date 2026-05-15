const mongoose = require("mongoose");

const Member = require("../models/Member");
const Transaction = require("../models/Transaction");

exports.processTransaction = async ({
  memberId,
  clubId = null,

  type,
  amount,

  method,

  source = "WEB",

  items = [],

  rideId = null,
  bookingId = null,
  parkingSessionId = null,

  promotion = null
}) => {

  const session = await mongoose.startSession();

  try {

    session.startTransaction();

    const member = await Member.findById(memberId).session(session);

    if (!member) {
      throw new Error("Member not found");
    }

    // =========================
    // WALLET DEBIT
    // =========================
    if (method === "WALLET") {

      if (member.walletBalance < amount) {
        throw new Error("Insufficient wallet balance");
      }

      member.walletBalance -= amount;
    }

    // =========================
    // TOPUP
    // =========================
    if (type === "TOPUP") {
      member.walletBalance += amount;
    }

    // =========================
    // POINTS
    // =========================
    let pointsEarned = 0;

    if (
      type === "PURCHASE" ||
      type === "RIDE" ||
      type === "BOOKING" ||
      type === "PARKING"
    ) {

      pointsEarned = Math.floor(amount / 10);

      member.pointsBalance += pointsEarned;
    }

    // =========================
    // TIER SYSTEM
    // =========================
    member.lifetimeSpend =
      (member.lifetimeSpend || 0) + amount;

    if (member.lifetimeSpend >= 10000) {
      member.tier = "BLACK";
    } else if (member.lifetimeSpend >= 3000) {
      member.tier = "DIAMOND";
    } else if (member.lifetimeSpend >= 750) {
      member.tier = "PLATINUM";
    }

    await member.save({ session });

    // =========================
    // CREATE TRANSACTION
    // =========================
    const transaction = await Transaction.create(
      [{
        memberId,
        clubId,

        type,
        amount,

        method,
        source,

        items,

        rideId,
        bookingId,
        parkingSessionId,

        pointsEarned,

        promotionId: promotion?._id || null,

        reference:
          "TXN-" +
          Date.now() +
          "-" +
          Math.floor(Math.random() * 10000),

        status: "SUCCESS"
      }],
      { session }
    );

    await session.commitTransaction();

    return {
      success: true,
      transaction: transaction[0],
      member
    };

  } catch (error) {

    await session.abortTransaction();

    throw error;

  } finally {

    session.endSession();
  }
};