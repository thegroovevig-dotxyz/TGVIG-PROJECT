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
   pricePerTable: 0,
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
    let res;

    if (editingId) {
      res = await API.put(
        `/table-bookings/${editingId}`,
        payload
      );

      setInventory((prev) =>
        prev.map((i) =>
          i._id === editingId
            ? {
                ...res.data,
                clubId: clubs.find(
                  (c) => c._id === form.clubId
                ),
              }
            : i
        )
      );
    } else {
      res = await API.post(
        "/table-bookings",
        payload
      );

      const newItem = {
        ...res.data,
        clubId: clubs.find(
          (c) => c._id === form.clubId
        ),
      };

      setInventory((prev) => [newItem, ...prev]);
    }

    alert("Saved successfully");

  } catch (err) {
    console.log(err);
  }
};

  const handleEdit = (item) => {
    setForm({
      clubId: item.clubId?._id,
      tier: item.tier,
      totalTables: item.totalTables,
      pricePerTable: item.pricePerTable,
    });

    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/table-booking/${id}`);
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

      <input
  type="number"
  placeholder="Price Per Table"
  value={form.pricePerTable}
  onChange={(e) =>
    setForm({ ...form, pricePerTable: e.target.value })
  }
/>


      <button onClick={handleSave}>
        {editingId ? "Update " : "Save "}
      </button>

      {/* LIST */}
      <h3>Club Table Inventory</h3>

      {inventory.map((i, index) => (
  <div
    key={i._id || index}
    style={{
      marginBottom: "10px",
      border: "1px solid #ccc",
      padding: "10px",
    }}
  >
    <p>
      <b>Club:</b>{" "}
      {i.clubId?.name || "N/A"}
    </p>

    <p>
      <b>Tier:</b>{" "}
      {i.tier || "STANDARD"}
    </p>

    <p>
      <b>Points Cost:</b>{" "}
      {i.pointsCost || 0}
    </p>

    <p>
      <b>Total:</b>{" "}
      {Number(i.totalTables || 0)}
    </p>

    <p>
      <b>Sold:</b>{" "}
      {Number(i.soldTables || 0)}
    </p>

    <p>
      <b>Available:</b>{" "}
      {Number(i.totalTables || 0) -
        Number(i.soldTables || 0)}
    </p>

    <button onClick={() => handleEdit(i)}>
      Edit
    </button>

    <button onClick={() => handleDelete(i._id)}>
      Delete
    </button>
  </div>
))}
   
    </div>
  );
}

export default TableBooking;