import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Properties() {
  const [properties, setProperties] = useState([]);

  const [form, setForm] = useState({
    type: "",
    name: "",
    location: "",
    rooms: "",
    pricePerNight: "",
  });

  const loadProperties = async () => {
    try {
      const res = await API.get("/properties");
      setProperties(res.data.properties || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const registerProperty = async () => {
    try {
      await API.post("/properties/register", form);

      setForm({
        type: "",
        name: "",
        location: "",
        rooms: "",
        pricePerNight: "",
      });

      loadProperties();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏨 Properties</h2>

      {/* REGISTER PROPERTY (PARTNER SIDE) */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Register Property</h3>

        <input
          placeholder="Type (Hotel / Lodge / Parking)"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        />

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          placeholder="Rooms"
          value={form.rooms}
          onChange={(e) =>
            setForm({ ...form, rooms: e.target.value })
          }
        />

        <input
          placeholder="Price Per Night"
          value={form.pricePerNight}
          onChange={(e) =>
            setForm({ ...form, pricePerNight: e.target.value })
          }
        />

        <button onClick={registerProperty}>
          Register Property
        </button>
      </div>

      {/* LIST PROPERTIES */}
      <h3>Available Properties</h3>

      {properties.length === 0 ? (
        <p>No properties available</p>
      ) : (
        properties.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{p.name}</h4>
            <p>📍 {p.location}</p>
            <p>🏷️ {p.type}</p>
            <p>💰 R{p.pricePerNight} / night</p>
            <p>🚪 Rooms: {p.rooms}</p>
          </div>
        ))
      )}
    </div>
  );
}