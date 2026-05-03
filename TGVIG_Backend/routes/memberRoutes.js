const router = require("express").Router();
const ctrl = require("../controllers/memberController");
const { createMember } = require("../controllers/memberController");

router.post("/", ctrl.createMember);
router.post("/register", createMember);
router.post("/login", ctrl.login);

router.get("/", ctrl.getMembers);
router.get("/:id", ctrl.getMember);
router.put("/:id", ctrl.updateMember);

router.post("/generate-card/:id", ctrl.generateCard);

router.get("/", async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings);
});

module.exports = router;