const WebContent = require("../models/WebContent");

// GET ONE SECTION


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

exports.getContent = async (req, res) => {
  try {
    const { section } = req.params;

    const doc = await WebContent.findOne({ section });

    // Always return a consistent structure (prevents frontend crashes)
    if (!doc) {
      return res.status(200).json({
        section,
        content: null,
        message: "No content found",
      });
    }

    return res.status(200).json({
      section: doc.section,
      content: doc.content,
    });
  } catch (err) {
    console.error("GET webcontent error:", err);

    return res.status(500).json({
      message: "Server error loading web content",
    });
  }
};

// POST /api/webcontent/:section
exports.saveContent = async (req, res) => {
  try {
    const { section } = req.params;
    const { content } = req.body;

    if (!section) {
      return res.status(400).json({ message: "Section is required" });
    }

    // Upsert = create if not exists, update if exists
    const updated = await WebContent.findOneAndUpdate(
      { section },
      { content },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: "Content saved",
      section: updated.section,
      content: updated.content,
    });
  } catch (err) {
    console.error("POST webcontent error:", err);

    return res.status(500).json({
      message: "Server error saving web content",
    });
  }
};