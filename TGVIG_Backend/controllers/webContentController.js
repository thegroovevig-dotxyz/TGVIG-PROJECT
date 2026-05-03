const WebContent = require("../models/WebContent");

// GET ONE SECTION
exports.getSection = async (req, res) => {
  try {
    const { section } = req.params;

    const data = await WebContent.findOne({ section });

    if (!data) {
      return res.json({ content: null });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE / UPDATE SECTION
exports.saveSection = async (req, res) => {
  try {
    const { section } = req.params;
    const { content } = req.body;

    const updated = await WebContent.findOneAndUpdate(
      { section },
      { content },
      { new: true, upsert: true } // 🔥 create if not exists
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// OPTIONAL DELETE SECTION
exports.deleteSection = async (req, res) => {
  try {
    const { section } = req.params;

    await WebContent.findOneAndDelete({ section });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};