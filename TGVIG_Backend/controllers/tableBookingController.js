const TableBooking = require("../models/TableBooking");
const Member = require("../models/Member");
const { sendNotification } = require("../services/notificationService");
const QRCode = require("qrcode");

exports.createBooking = async (req, res) => {
  try {
    const { memberId, clubId, tier, numberOfTables, pricePerTable } = req.body;

    const total = numberOfTables * pricePerTable;

    const member = await Member.findById(memberId);

    if (!member || member.walletBalance < total) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    member.walletBalance -= total;
    await member.save();

    const booking = await TableBooking.create({
      ...req.body,
      totalAmount: total,
      status: "CONFIRMED",
      couponCode: `TABLE-${Date.now()}`,
    });

    const qr = await QRCode.toDataURL("COUPON-" + Date.now());

    await sendNotification("booking", member, {
  date,
  table: numberOfTables,
  totalAmount: total,
      status: "CONFIRMED",
      couponCode: `TABLE-${Date.now()}`,
      qr,
      code: coupon.code,
  expiry: coupon.expiryDate,
});

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  const data = await TableBooking.find()
    .populate("memberId clubId")
    .sort({ createdAt: -1 });

  res.json(data);
};