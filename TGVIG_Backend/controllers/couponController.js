const Coupon = require("../models/Coupon");
const QRCode = require("qrcode");

// CREATE
exports.createCoupon = async (req, res) => {
  try {
    const code = "CPN" + Date.now();

    const qrCode = await QRCode.toDataURL(code);

    const coupon = new Coupon({
      ...req.body,
      code,
      qrCode,
    });

    await coupon.save();

    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
};

// DELETE
exports.deleteCoupon = async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};