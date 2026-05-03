import { useEffect, useState } from "react";
import {
  getBlogs,
  createBlog,
  deleteBlog,
} from "../api/blogs.api";
import { getClubs } from "../api/clubs.api";
import API from "../api/axios";

function Blogs() {
  const [clubs, setClubs] = useState([]);
  const [clubId, setClubId] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [logo, setLogo] = useState("");

  const [form, setForm] = useState({
  title: "",
  content: "",
  image: "",
});

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    const res = await getClubs();
    setClubs(res.data);
  };

  const loadBlogs = async (id) => {
    const res = await getBlogs(id);
    setBlogs(res.data);
  };

  const handleClubChange = (e) => {
    const id = e.target.value;
    setClubId(id);
    loadBlogs(id);
  };

useEffect(() => {
  loadSettings();
}, []);

const loadSettings = async () => {
  const res = await API.get("/settings");
  setLogo(res.data?.logo || "");
};

const saveLogo = async () => {
  await API.put("/settings", { logo });
  alert("Logo saved");
};

const deleteLogo = async () => {
  await API.put("/settings", { logo: "" });
  setLogo("");
  alert("Logo removed");
};

  const handleCreate = async (e) => {
    e.preventDefault();

    await createBlog({
      ...form,
      clubId,
    });

    setForm({ title: "", content: "", image: "" });
    loadBlogs(clubId);
  };

  const handleDelete = async (id) => {
    await deleteBlog(id);
    loadBlogs(clubId);
  };

  return (
    <div>
      <h2>Blogs</h2>

      {/* CLUB */}
      <select onChange={handleClubChange}>
        <option>Select Club</option>
        {clubs.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* CREATE */}
      <form onSubmit={handleCreate}>
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

        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <button>Create Blog</button>
      </form>

      <h3>🌐 GLOBAL LOGO</h3>

<input
  placeholder="Logo URL"
  value={logo}
  onChange={(e) => setLogo(e.target.value)}
/>

<button onClick={saveLogo}>Save Logo</button>
<button onClick={deleteLogo} style={{ color: "red" }}>
  Delete Logo
</button>

{logo && (
  <div>
    <p>Preview:</p>
    <img src={logo} alt="logo" style={{ width: 100 }} />
  </div>
)}

<hr />

      {/* LIST */}
      <div>
        {blogs.map((b) => (
          <div key={b._id}>
            <img src={b.image} width="120" alt="" />
            <h4>{b.title}</h4>
            <p>{b.content}</p>

            <button onClick={() => handleDelete(b._id)}>
              Delete
            </button>

             {/* 🔥 WEB LOGO (NEW) */}
    {b.logo && (
      <div style={{ marginTop: "5px" }}>
        <img
          src={b.logo}
          alt="logo"
          style={{ width: "60px" }}
        />
      </div>
    )}
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;