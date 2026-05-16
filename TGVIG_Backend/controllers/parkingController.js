const ParkingSession = require("../models/ParkingSession");
const transactionService = require("../services/transactionService");

// 🅿️ START SESSION
exports.startParking = async (req, res) => {
  try {

    const memberId = req.user._id;

    const {
      parkingId,
      vehiclePlate
    } = req.body;

    const session = await ParkingSession.create({
      memberId,
      parkingId,
      vehiclePlate,
      startTime: new Date(),
      status: "ACTIVE"
    });

    res.json({
      success: true,
      session
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 💳 END & PAY PARKING
exports.endParking = async (req, res) => {
  try {

    const memberId = req.user._id;
    const { sessionId, amount } = req.body;

    const session =
      await ParkingSession.findById(sessionId);

    const result =
      await transactionService.processTransaction({
        memberId,
        amount,
        type: "PARKING",
        method: "WALLET",
        parkingSessionId: sessionId
      });

    session.endTime = new Date();
    session.status = "COMPLETED";

    await session.save();

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

exports.getMyParking = async (req, res) => {
  try {
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllParking = async (req, res) => {
  try {

    const parking = await Parking.find()
      .sort({ createdAt: -1 });

    res.json(parking);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};