const router = require("express").Router();
const ctrl = require("../controllers/memberController");

// CREATE / REGISTER
router.post("/register", ctrl.createMember);

// LOGIN
router.post("/login", ctrl.login);

// MEMBERS
router.get("/", ctrl.getMembers);
router.get("/:id", ctrl.getMember);
router.put("/:id", ctrl.updateMember);
router.delete("/:id", ctrl.deleteMember);
// CARD
router.post("/generate-card/:id", ctrl.generateCard);

router.get("/", async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings);
});

module.exports = router;