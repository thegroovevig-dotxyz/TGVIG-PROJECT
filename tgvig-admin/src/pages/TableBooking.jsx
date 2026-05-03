import { useEffect, useState } from "react";
import API from "../api/axios";
import { getClubs } from "../api/clubs.api";

function TableBooking() {
  const [clubs, setClubs] = useState([]);
  const [inventory, setInventory] = useState([]);

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
    setClubs(res.data);
  };

  const loadInventory = async () => {
    const res = await API.get("/table-bookings"); // (your inventory endpoint)
    setInventory(res.data);
  };

  const handleCreate = async () => {
    await API.post("/table-bookings", form);
    loadInventory();
  };

  return (
    <div>
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

      {/* INPUTS (ONLY FOR SETTING INVENTORY) */}
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

      <button onClick={handleCreate}>
        Save Inventory
      </button>

      {/* LIST */}
      <h3>Club Table Inventory</h3>

      {inventory.map((i) => (
        <div key={i._id} style={{ marginBottom: "10px" }}>
          <p><strong>Club:</strong> {i.clubId?.name}</p>
          <p><strong>Tier:</strong> {i.tier}</p>

          <p><strong>Total:</strong> {i.totalTables}</p>
          <p><strong>Sold:</strong> {i.soldTables}</p>

          <p>
            <strong>Available:</strong>{" "}
            {i.totalTables - i.soldTables}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TableBooking;