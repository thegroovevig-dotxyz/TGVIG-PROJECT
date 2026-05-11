import { useEffect, useState } from "react";
import API from "../api/axios";
import { getClubs } from "../api/clubs.api";

function TableBooking() {
  const [clubs, setClubs] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    clubId: "",
    tier: "STANDARD",
    totalTables: 0,
    soldTables: 0,
  });

  useEffect(() => {
    loadClubs();
    loadInventory();
  }, []);

  const loadClubs = async () => {
    const res = await getClubs();
    setClubs(res.data || []);
  };

  const loadInventory = async () => {
    const res = await API.get("/table-bookings");
    setInventory(res.data || []);
  };

  // CREATE / UPDATE
  const handleSave = async () => {
    const payload = {
      ...form,
      totalTables: Number(form.totalTables),
      soldTables: Number(form.soldTables),
    };

    try {
      if (editingId) {
        await API.put(`/table-bookings/${editingId}`, payload);
      } else {
        await API.post("/table-bookings", payload);
      }

      setForm({
        clubId: "",
        tier: "STANDARD",
        totalTables: 0,
        soldTables: 0,
      });

      setEditingId(null);
      loadInventory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      clubId: item.clubId?._id,
      tier: item.tier,
      totalTables: item.totalTables,
      soldTables: item.soldTables,
    });

    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/table-bookings/${id}`);
    loadInventory();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Table Inventory</h2>

      {/* CLUB SELECT */}
      <select
        value={form.clubId}
        onChange={(e) =>
          setForm({ ...form, clubId: e.target.value })
        }
      >
        <option value="">Select Club</option>
        {clubs.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* TIER */}
      <select
        value={form.tier}
        onChange={(e) =>
          setForm({ ...form, tier: e.target.value })
        }
      >
        <option value="STANDARD">Standard</option>
        <option value="VIP">VIP</option>
        <option value="VVIP">VVIP</option>
      </select>

      {/* INPUTS */}
      <input
        type="number"
        placeholder="Total Tables"
        value={form.totalTables}
        onChange={(e) =>
          setForm({ ...form, totalTables: e.target.value })
        }
      />


      <button onClick={handleSave}>
        {editingId ? "Update " : "Save "}
      </button>

      {/* LIST */}
      <h3>Club Table Inventory</h3>

      {inventory.map((i) => (
        <div
          key={i._id}
          style={{
            marginBottom: "10px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <p><b>Club:</b> {i.clubId?.name}</p>
          <p><b>Tier:</b> {i.tier}</p>

          <p><b>Total:</b> {i.totalTables}</p>
          <p><b>Sold:</b> {i.soldTables}</p>

          <p>
            <b>Available:</b>{" "}
            {Number(i.totalTables) - Number(i.soldTables)}
          </p>

          <button onClick={() => handleEdit(i)}>Edit</button>
          <button onClick={() => handleDelete(i._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TableBooking;