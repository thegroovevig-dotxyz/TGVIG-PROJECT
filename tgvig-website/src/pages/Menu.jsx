import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [clubs, setClubs] = useState([]);
const [selectedClub, setSelectedClub] = useState("");

  // store selected size per item
  const [selectedSize, setSelectedSize] = useState({});
  const [quantity, setQuantity] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    const clubsRes = await API.get("/clubs");

    setClubs(clubsRes.data || []);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  if (!selectedClub?._id) return;

  loadMenu(selectedClub._id);
}, [selectedClub]);

const loadMenu = async (clubId) => {
   console.log("🔥 CLUB ID SENT:", clubId);
  try {
    const res = await API.get(`/menu/${clubId}`);

    console.log("MENU RESPONSE:", res.data);

    setMenu(res.data || []);
  } catch (err) {
    console.log(err);
  }
};

 const addItemToCart = (item) => {
  const size = selectedSize[item._id];
  const qty = quantity[item._id] || 1;

  if (!size) {
    alert("Select size");
    return;
  }

  const pricePerUnit = item.price?.[size];

  const cartItem = {
    _id: Date.now(), 
    name: item.name,
    size,
    quantity: qty,
    price: pricePerUnit,
    total: pricePerUnit * qty,
  };

  console.log("ADDING:", cartItem);

  addToCart(cartItem);

  // CLEAR AFTER ADD
  setSelectedSize((prev) => ({
    ...prev,
    [item._id]: "",
  }));

  setQuantity((prev) => ({
    ...prev,
    [item._id]: 1,
  }));
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>MENU</h2>

      <div style={{ marginBottom: "20px" }}>
  <label>Select Club: </label>

  <select
    value={selectedClub}
    onChange={(e) => {
  const club = clubs.find(c => c._id === e.target.value);
  setSelectedClub(club);
}}
  >
    <option value="">-- Select Club --</option>

    {clubs.map((c) => (
      <option key={c._id} value={c._id}>
        {c.name}
      </option>
    ))}
  </select>
</div>

      <div style={{ display: "grid", gap: "15px" }}>
        {menu.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            {item.image && (
              <img
                src={
                  item.image.startsWith("http")
                    ? item.image
                    : `http://localhost:5000${item.image}`
                }
                alt=""
                width="100%"
                style={{ borderRadius: "6px" }}
              />
            )}

            <h3>{item.name}</h3>
            <p><b>{item.type}</b></p>

             {/* SPECIAL */}
            {item.type === "SPECIAL" && (
              <>
                <p> Points: {item.rewards?.points}</p>
                <p> Reward: {item.rewards?.itemReward}</p>
                <p> Discount: {item.rewards?.discount}%</p>
              </>
            )}

            {/* SIZE SELECTOR */}
            <div style={{ marginBottom: "10px" }}>
              <label>
                <input
                  type="radio"
                  name={item._id}
                  onChange={() =>
                    setSelectedSize((prev) => ({
                      ...prev,
                      [item._id]: "single",
                    }))
                  }
                />
                Single (R{item.price?.single})
              </label>

              <br />

              <label>
                <input
                  type="radio"
                  name={item._id}
                  onChange={() =>
                    setSelectedSize((prev) => ({
                      ...prev,
                      [item._id]: "x4",
                    }))
                  }
                />
                x4 (R{item.price?.x4})
              </label>

              <br />

              <label>
                <input
                  type="radio"
                  name={item._id}
                  onChange={() =>
                    setSelectedSize((prev) => ({
                      ...prev,
                      [item._id]: "x6",
                    }))
                  }
                />
                x6 (R{item.price?.x6})
              </label>

{/* QUANTITY */}
<div style={{ marginTop: "10px" }}>
  <label>Quantity: </label>
  <input
    type="number"
    min="1"
    value={quantity[item._id] || 1}
    onChange={(e) =>
      setQuantity((prev) => ({
        ...prev,
        [item._id]: Number(e.target.value),
      }))
    }
    style={{ width: "60px" }}
  />
</div>

            </div>

            <button onClick={() => addItemToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;