import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

function MenuGrid() {
  const [menu, setMenu] = useState([]);
  const params = useParams();
const clubId = params?.clubId;
const deviceId = params?.deviceId;

  const [selectedSize, setSelectedSize] = useState({});
  const [quantity, setQuantity] = useState({});

  const { addToCart } = useCart();

  useEffect(() => {
  if (!clubId || !deviceId) {
    console.log("Missing route params:", { clubId, deviceId });
    return;
  }

  loadMenu();
}, [clubId, deviceId]);

const loadMenu = async () => {
  try {
    const res = await API.get("/menu", {
      params: {
        clubId,
        deviceId,
        type: "SELF_POS",
      },
    });

    setMenu(res.data || []);
  } catch (err) {
    console.log("MENU ERROR:", err.response?.data || err.message);
  }
};

  // ✅ SAME LOGIC AS WEB
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

    console.log("ADDING TO CART:", cartItem);

    addToCart(cartItem);

    // reset
    setSelectedSize((prev) => ({ ...prev, [item._id]: "" }));
    setQuantity((prev) => ({ ...prev, [item._id]: 1 }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>SELF POS MENU</h2>

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
            {/* IMAGE */}
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                width="100%"
                style={{ borderRadius: "6px" }}
              />
            )}

            <h3>{item.name}</h3>
            <p><b>{item.type}</b></p>

            {/* SPECIAL INFO */}
            {item.type === "SPECIAL" && (
              <div>
                <p>Points: {item.rewards?.points}</p>
                <p>Reward: {item.rewards?.itemReward}</p>
                <p>Discount: {item.rewards?.discount}%</p>
              </div>
            )}

            {/* SIZE SELECT */}
            <div>
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
            </div>

            {/* QUANTITY */}
            <div style={{ marginTop: "10px" }}>
              <label>Qty: </label>
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

            {/* ADD BUTTON */}
            <button
              onClick={() => addItemToCart(item)}
              style={{ marginTop: "10px" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuGrid;