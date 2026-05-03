const Club = require("../models/Club");

// CREATE club
exports.createClub = async (req, res) => {
  const club = await Club.create(req.body);
  res.json(club);
};

// GET all clubs
exports.getClubs = async (req, res) => {
  const clubs = await Club.find().populate("menus promotions");
  res.json(clubs);
};

// GET one club
exports.getClub = async (req, res) => {
  const club = await Club.findById(req.params.id)
    .populate("menus promotions");
  res.json(club);
};

exports.deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.json({ message: "Club deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};