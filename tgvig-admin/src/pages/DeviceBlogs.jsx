import { useState, useEffect } from "react";
import API from "../api/axios";

function DeviceBlogs() {
  const [blogs, setBlogs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    image: "",
    clubId: "",
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  // 🔥 LOAD ALL BLOGS (use global route)
  const loadBlogs = async () => {
    try {
      const res = await API.get("/blogs"); // ✅ FIXED
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 CREATE BLOG
  const createBlog = async () => {
    try {
      await API.post("/blogs", form);

      // reset form
      setForm({
        title: "",
        image: "",
        clubId: "",
      });

      loadBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE BLOG
  const deleteBlog = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      loadBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>POS BLOGS / ADS</h2>

      {/* 🔥 FORM */}
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        placeholder="Image URL"
        value={form.image}
        onChange={(e) =>
          setForm({ ...form, image: e.target.value })
        }
      />

      <input
        placeholder="Club ID"
        value={form.clubId}
        onChange={(e) =>
          setForm({ ...form, clubId: e.target.value })
        }
      />

      <button onClick={createBlog}>Add Blog</button>

      <hr />

      {/* 🔥 LIST */}
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        blogs.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            {b.image && (
  <img src={b.image} width="200" alt="" />
)}
            <h4>{b.title}</h4>

            <p>Club: {b.clubId?.name}</p>

            {/* 🔥 DELETE BUTTON */}
            <button
              onClick={() => deleteBlog(b._id)}
              style={{ background: "red", color: "#fff" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DeviceBlogs;