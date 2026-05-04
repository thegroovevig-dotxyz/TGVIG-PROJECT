const WebContent = require("../models/WebContent");

// GET ONE SECTION
exports.getSection = async (req, res) => {
  try {
    const { section } = req.params;

    const data = await WebContent.findOne({ section });

    res.json({
      content: data ? data.content : null
    });
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

exports.getPageContent = async (req, res) => {
  try {
    const page = req.params.page;

    const data = await WebContent.findOne({ page });

    if (!data) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(data);

  } catch (err) {
    console.error("Webcontent error:", err);
    res.status(500).json({ error: err.message });
  }
};