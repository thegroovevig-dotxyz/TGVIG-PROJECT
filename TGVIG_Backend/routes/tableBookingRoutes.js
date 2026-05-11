const router = require("express").Router();

console.log("TABLE BOOKING ROUTES LOADED");

router.get("/", (req, res) => {
  res.json([]);
});

router.post("/", (req, res) => {
  console.log("POST HIT");
  res.json({
    success: true,
    body: req.body,
  });
});

router.put("/:id", (req, res) => {
  res.json({ updated: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.json({ deleted: req.params.id });
});

module.exports = router;