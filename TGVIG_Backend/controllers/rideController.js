const transactionService = require("../services/transactionService");
const Ride = require("../models/Ride");

// 🚕 REQUEST RIDE
exports.requestRide = async (req, res) => {
  try {

    const memberId = req.user._id;

    const {
      pickup,
      dropoff,
      estimatedPrice
    } = req.body;

    const ride = await Ride.create({
      memberId,
      pickup,
      dropoff,
      price: estimatedPrice,
      status: "REQUESTED"
    });

    res.json({
      success: true,
      ride
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 💳 PAY FOR RIDE
exports.payRide = async (req, res) => {
  try {

    const memberId = req.user._id;
    const { rideId } = req.body;

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found"
      });
    }

    const result =
      await transactionService.processTransaction({
        memberId,
        amount: ride.price,
        type: "RIDE",
        method: "WALLET",
        rideId
      });

    ride.status = "COMPLETED";
    ride.paymentStatus = "PAID";

    await ride.save();

    res.json({
      success: true,
      result
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

exports.getMyRides = async (req, res) => {
  try {

    const rides = await Ride.find({
      user: req.user._id
    });

    res.json({
      success: true,
      rides
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
