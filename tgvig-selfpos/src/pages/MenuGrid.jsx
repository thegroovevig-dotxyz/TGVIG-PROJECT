import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";

function MenuGrid() {
  const [menu, setMenu] = useState([]);

  

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

  const addItemToCart = (item) => {
    const size = selectedSize[item._id];
    const qty = quantity[item._id] || 1;

    if (!size) return alert("Select size");

    const pricePerUnit = item.price?.[size];

    const cartItem = {
      _id: Date.now(),
      name: item.name,
      size,
      quantity: qty,
      price: pricePerUnit,
      total: pricePerUnit * qty,
    };

    addToCart(cartItem);

    setSelectedSize((p) => ({ ...p, [item._id]: "" }));
    setQuantity((p) => ({ ...p, [item._id]: 1 }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>SELF POS MENU</h2>

      {menu.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>

          {item.image && <img src={item.image} width="100%" />}

          <h3>{item.name}</h3>
          <p>{item.type}</p>

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

export default MenuGrid;