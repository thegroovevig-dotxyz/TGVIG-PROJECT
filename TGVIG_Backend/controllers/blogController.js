const Blog = require("../models/Blog");

exports.getBlogsByClub = async (req, res) => {
  const blogs = await Blog.find({ clubId: req.params.clubId });
  res.json(blogs);
};

exports.createBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("clubId");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};