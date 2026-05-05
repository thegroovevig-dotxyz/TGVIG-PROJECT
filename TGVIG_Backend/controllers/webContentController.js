const WebContent = require("../models/WebContent");

// GET
exports.getContent = async (req, res) => {
  try {
    const { section } = req.params;

    const doc = await WebContent.findOne({ section });

    return res.status(200).json({
      section,
      content: doc?.content ?? (Array.isArray(doc?.content) ? [] : {}),
    });
  } catch (err) {
    console.error("GET error:", err);
    return res.status(200).json({
      section: req.params.section,
      content: Array.isArray(req.params.section) ? [] : {},
    });
  }
};

// SAVE (UPSERT)
exports.saveContent = async (req, res) => {
  try {
    const { section } = req.params;
    const { content } = req.body;

    const updated = await WebContent.findOneAndUpdate(
      { section },
      { section, content },
      { new: true, upsert: true }
    );

    return res.status(200).json(updated);
  } catch (err) {
    console.error("SAVE error:", err);
    return res.status(500).json({ message: "Save failed" });
  }
};

// DELETE
exports.deleteSection = async (req, res) => {
  try {
    await WebContent.findOneAndDelete({ section: req.params.section });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};