const router = require("express").Router();
const ctrl = require("../controllers/blogController");

router.get("/:clubId", ctrl.getBlogsByClub);
router.post("/", ctrl.createBlog);
router.put("/:id", ctrl.updateBlog);
router.delete("/:id", ctrl.deleteBlog);
router.get("/", ctrl.getAllBlogs); 

module.exports = router;