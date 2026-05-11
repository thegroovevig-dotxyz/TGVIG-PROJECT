const TableBooking = require("../models/TableBooking");
const Member = require("../models/Member");
const QRCode = require("qrcode");

exports.createBooking = async (req, res) => {
  try {
    const booking = await TableBooking.create({
      clubId: req.body.clubId,
      tier: req.body.tier,

      totalTables: Number(req.body.totalTables),

      soldTables: Number(req.body.soldTables),

      numberOfTables: Number(req.body.totalTables),

      pricePerTable: Number(req.body.pricePerTable || 0),

      totalAmount:
        Number(req.body.totalTables) *
        Number(req.body.pricePerTable || 0),
    });

    const populated = await TableBooking.findById(
      booking._id
    ).populate("clubId");

    res.json(populated);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

    // =========================
    // 💰 PAYMENT LOGIC
    // =========================

    if (paymentMethod === "WALLET") {
      if (member.walletBalance < total) {
        return res.status(400).json({ message: "Insufficient wallet balance" });
      }
      member.walletBalance -= total;
    }

    if (paymentMethod === "POINTS") {
      if (member.pointsBalance < total) {
        return res.status(400).json({ message: "Insufficient points" });
      }

      // convert 1 point = 1 unit (adjust if needed)
      member.pointsBalance -= total;
    }

    await member.save();

    // =========================
    // 🎟️ QR CODE
    // =========================
    const couponCode = `TABLE-${Date.now()}`;
    const qr = await QRCode.toDataURL(couponCode);

    // =========================
    // 🧾 CREATE BOOKING
    // =========================
    const booking = await TableBooking.create({
      memberId,
      clubId,
      tier,
      numberOfTables,
      pricePerTable,
      totalAmount: total,
      paymentMethod,
      status: "CONFIRMED",
      couponCode,
      qrCode: qr,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const data = await TableBooking.find()
      .populate("memberId clubId")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
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