import { useEffect, useState } from "react";
import { getClubs, createClub } from "../api/clubs.api";

function Clubs() {
  const [clubs, setClubs] = useState([]);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    const res = await getClubs();
    setClubs(res.data);
  };

  const deleteClub = (id) =>
  API.delete(`/clubs/${id}`);

  const handleCreate = async () => {
    try {
      await createClub({
        name,
        location,
        image
      });

      setName("");
      setLocation("");

      loadClubs(); // refresh list
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Clubs</h2>

      {/* 🔥 CREATE FORM */}

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Club name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
  placeholder="Image URL"
  value={image}
  onChange={(e) => setImage(e.target.value)}
/>

        <button onClick={handleCreate}>
          Add Club
        </button>
      </div>

      {/* LIST */}
      {clubs.map((c) => (
        <div key={c._id}>
           {c.name} - {c.location}

           {c.image && (
  <img
    src={c.image}
    alt={c.name}
    width="80"
    height="80"
    style={{ objectFit: "cover", marginRight: "10px" }}
  />
)}

          <button
            onClick={() => handleDelete(c._id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Clubs;