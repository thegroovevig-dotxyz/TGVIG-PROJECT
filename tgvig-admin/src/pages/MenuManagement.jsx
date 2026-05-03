import { useEffect, useState } from "react";
import { getMenu, createMenu, deleteMenu } from "../api/menu.api";
import { getClubs } from "../api/clubs.api";

function MenuManagement() {
  const [clubs, setClubs] = useState([]);
  const [clubId, setClubId] = useState("");
  const [menu, setMenu] = useState([]);

  const [form, setForm] = useState({
    name: "",
    type: "REGULAR",
  tier: "GOLD",
    single: "",
    x4: "",
    x6: "",
    points: "",
    itemReward: "",
    discount: "",
    image: "",
  });

  // ✅ LOAD CLUBS ONCE
  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    try {
      const res = await getClubs();
      console.log("CLUBS:", res.data);
      setClubs(res.data);
    } catch (err) {
      console.log("LOAD CLUBS ERROR:", err);
    }
  };

  // ✅ LOAD MENU WHEN CLUB SELECTED
  useEffect(() => {
    if (!clubId) return;

    console.log("LOADING MENU FOR:", clubId);

    loadMenu(clubId);
  }, [clubId]);

  const loadMenu = async (id) => {
    try {
      const res = await getMenu(id);
      console.log("MENU:", res.data);
      setMenu(res.data);
    } catch (err) {
      console.log("LOAD MENU ERROR:", err);
    }
  };

  const handleClubChange = (e) => {
    setClubId(e.target.value); // ONLY THIS
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!clubId) {
      alert("Select club first");
      return;
    }

    try {
      await createMenu({
        clubId,
        name: form.name,
        type: form.type,
        tier: form.tier,
        price: {
          single: Number(form.single),
          x4: Number(form.x4),
          x6: Number(form.x6),
        },
        rewards: {
          points: Number(form.points),
          itemReward: form.itemReward,
          discount: Number(form.discount),
        },
        image: form.image,
      });

      // reset
      setForm({
        name: "",
        type: "REGULAR",
        single: "",
        x4: "",
        x6: "",
        points: "",
        itemReward: "",
        discount: "",
        image: "",
      });

      loadMenu(clubId);
    } catch (err) {
      console.log("CREATE ERROR:", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteMenu(id);
    loadMenu(clubId);
  };

  return (
    <div>
      <h2>Menu Management</h2>

      {/* CLUB SELECT */}
      <select value={clubId} onChange={handleClubChange}>
        <option value="">Select Club</option>
        {clubs.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
  value={form.type}
  onChange={(e) =>
    setForm({ ...form, type: e.target.value })
  }
>
  <option value="REGULAR">Regular</option>
  <option value="SPECIAL">Special</option>
</select>

<select
  value={form.tier}
  onChange={(e) =>
    setForm({ ...form, tier: e.target.value })
  }
>
  <option value="GOLD">Gold (Starter)</option>
  <option value="SILVER">Silver</option>
  <option value="BLACK">VIP Black</option>
</select>

      {/* FORM */}
      <form onSubmit={handleCreate}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Single"
          value={form.single}
          onChange={(e) => setForm({ ...form, single: e.target.value })}
        />

        <input
          placeholder="x4"
          value={form.x4}
          onChange={(e) => setForm({ ...form, x4: e.target.value })}
        />

        <input
          placeholder="x6"
          value={form.x6}
          onChange={(e) => setForm({ ...form, x6: e.target.value })}
        />

        <input
          placeholder="Points"
          value={form.points}
          onChange={(e) => setForm({ ...form, points: e.target.value })}
        />

        <input
          placeholder="Reward"
          value={form.itemReward}
          onChange={(e) =>
            setForm({ ...form, itemReward: e.target.value })
          }
        />

        <input
          placeholder="Discount"
          value={form.discount}
          onChange={(e) =>
            setForm({ ...form, discount: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <button>Add</button>
      </form>

      {/* MENU */}
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  }}
>
  {menu.map((item) => (
    <div
      key={item._id}
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        borderRadius: "10px",
        background: "#fff",
      }}
    >
      <img
        src={item.image}
        alt=""
        width="100%"
        style={{ borderRadius: "8px", height: "120px", objectFit: "cover" }}
      />

      <h3>{item.name}</h3>

      <p><b>Type:</b> {item.type}</p>
      <p><b>Tier:</b> {item.tier}</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <p>Single: R{item.price?.single}</p>
        <p>x4: R{item.price?.x4}</p>
        <p>x6: R{item.price?.x6}</p>
      </div>

      <hr />

      <p>Points: {item.rewards?.points}</p>
      <p>Reward: {item.rewards?.itemReward || "0"}</p>
      <p>Discount: {item.rewards?.discount ?? 0}%</p>

      <button onClick={() => handleDelete(item._id)}>
        Delete
      </button>
    </div>
  ))}
</div>
    </div>
  );
}

export default MenuManagement;