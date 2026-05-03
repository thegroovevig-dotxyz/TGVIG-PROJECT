const Promotion = require("../models/Promotion");

// CREATE promotion (admin)
exports.createPromotion = async (req, res) => {
  const promo = await Promotion.create(req.body);
  res.json(promo);
};

// GET active promotions
exports.getPromotions = async (req, res) => {
  try {
  const promos = await Promotion.find({ isActive: true })
  .populate("clubId", "name")
  .sort({ createdAt: -1 });

  
  res.json(promos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};