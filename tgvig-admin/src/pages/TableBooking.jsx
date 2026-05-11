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
    pricePerTable: 0,
    pointsCost: 0,
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

  // =========================
  // SAVE (CREATE / UPDATE)
  // =========================
  const handleSave = async () => {
    const payload = {
      clubId: form.clubId,
      tier: form.tier,
      totalTables: Number(form.totalTables),
      soldTables: Number(form.soldTables),

      pricePerTable: Number(form.pricePerTable),
      pointsCost: Number(form.pointsCost),

      numberOfTables: Number(form.totalTables),
      totalAmount:
        Number(form.totalTables) * Number(form.pricePerTable || 0),
    };

    try {
      let res;

      if (editingId) {
        res = await API.put(
          `/table-bookings/${editingId}`,
          payload
        );
      } else {
        res = await API.post(
          "/table-bookings",
          payload
        );
      }

      setEditingId(null);

      setForm({
        clubId: "",
        tier: "STANDARD",
        totalTables: 0,
        soldTables: 0,
        pricePerTable: 0,
        pointsCost: 0,
      });

      loadInventory();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleEdit = (item) => {
    setForm({
      clubId: item.clubId?._id || "",
      tier: item.tier || "STANDARD",
      totalTables: item.totalTables || 0,
      soldTables: item.soldTables || 0,
      pricePerTable: item.pricePerTable || 0,
      pointsCost: item.pointsCost || 0,
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

      {/* CLUB */}
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

      {/* TABLES */}
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
        placeholder="Sold Tables"
        value={form.soldTables}
        onChange={(e) =>
          setForm({ ...form, soldTables: e.target.value })
        }
      />

      {/* PRICE */}
      <input
        type="number"
        placeholder="Price Per Table"
        value={form.pricePerTable}
        onChange={(e) =>
          setForm({ ...form, pricePerTable: e.target.value })
        }
      />

      {/* POINTS */}
      <input
        type="number"
        placeholder="Points Cost"
        value={form.pointsCost}
        onChange={(e) =>
          setForm({ ...form, pointsCost: e.target.value })
        }
      />

      <button onClick={handleSave}>
        {editingId ? "Update" : "Save"}
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
            {(i.totalTables || 0) - (i.soldTables || 0)}
          </p>

          <p><b>Price:</b> {i.pricePerTable || 0}</p>
          <p><b>Points:</b> {i.pointsCost || 0}</p>

          <button onClick={() => handleEdit(i)}>Edit</button>
          <button onClick={() => handleDelete(i._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TableBooking;