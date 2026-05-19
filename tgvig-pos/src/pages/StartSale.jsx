import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import API from "../api/axios";
import { useParams } from "react-router-dom";

function StartSale() {
  const [menu, setMenu] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [quantity, setQuantity] = useState({});
  const { addToCart } = useCart();

 
  const clubId = "69e9284d26961ca9fbef1c08";
  const deviceId = "69f328236119ac5b6afe3b69";

  useEffect(() => {
    console.log("🔥 StartSale mounted");

    if (!clubId || !deviceId) {
      console.log("⛔ Missing params:", { clubId, deviceId });
      return;
    }

    loadData();
  }, [clubId, deviceId]);


  const loadData = async () => {
  try {
    console.log("PARAMS:", { clubId, deviceId });

    const res = await API.get(
      `/menu?clubId=${clubId}&deviceId=${deviceId}&type=POS`
    );

    console.log("✅ RESPONSE:", res.data);

    setMenu(res.data);

  } catch (err) {
    console.log("❌ ERROR:", err?.response?.data || err.message);
  }
};

  const addItemToCart = (item) => {
    const size = selectedSize[item._id];
    const qty = quantity[item._id] || 1;

    if (!size) {
      alert("Select size first");
      return;
    }

    const price = item.price?.[size] || 0;

    addToCart({
      _id: Date.now(),
      name: item.name,
      size,
      quantity: qty,
      price,
      total: price * qty,
    });

    setSelectedSize((p) => ({ ...p, [item._id]: "" }));
    setQuantity((p) => ({ ...p, [item._id]: 1 }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>START SALE</h2>

      <h3>Menu</h3>

      {menu.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <h4>{item.name}</h4>

          <p>Single: R {item.price?.single}</p>
          <p>x4: R {item.price?.x4}</p>
          <p>x6: R {item.price?.x6}</p>

          {/* SIZE */}
          <div>
            <label>
              <input
                type="radio"
                name={item._id}
                onChange={() =>
                  setSelectedSize((p) => ({ ...p, [item._id]: "single" }))
                }
              />
              Single
            </label>

            <label>
              <input
                type="radio"
                name={item._id}
                onChange={() =>
                  setSelectedSize((p) => ({ ...p, [item._id]: "x4" }))
                }
              />
              x4
            </label>

            <label>
              <input
                type="radio"
                name={item._id}
                onChange={() =>
                  setSelectedSize((p) => ({ ...p, [item._id]: "x6" }))
                }
              />
              x6
            </label>
          </div>

          {/* QTY */}
          <input
            type="number"
            min="1"
            value={quantity[item._id] || 1}
            onChange={(e) =>
              setQuantity((p) => ({
                ...p,
                [item._id]: Number(e.target.value),
              }))
            }
          />

          <button onClick={() => addItemToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default StartSale;