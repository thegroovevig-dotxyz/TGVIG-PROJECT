const TableBooking = require("../models/TableBooking");
const Member = require("../models/Member");
const QRCode = require("qrcode");

exports.createBooking = async (req, res) => {
  try {
    const booking = await TableBooking.create({
      clubId: req.body.clubId,
      tier: req.body.tier,

      totalTables: Number(req.body.totalTables || 0),
      soldTables: Number(req.body.soldTables || 0),

      pricePerTable: Number(req.body.pricePerTable || 0),

      // optional admin calc fields
      pointsCost: Number(req.body.pointsCost || 0),

      totalAmount:
        Number(req.body.totalTables || 0) *
        Number(req.body.pricePerTable || 0),
    });

    const populated = await TableBooking.findById(booking._id).populate("clubId");

    res.json(populated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const data = await TableBooking.find();
    res.json(data);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.updateBooking = async (req, res) => {
  try {
    const updated = await TableBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await TableBooking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};