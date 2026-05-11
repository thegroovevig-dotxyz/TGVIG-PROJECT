import { useEffect, useState } from "react";
import API from "../api/axios";

function Menu() {
  const [menu, setMenu] = useState([]);

  // store selected size per item
  const [selectedSize, setSelectedSize] = useState({});
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const res = await API.get("/menu?type=WEB");
      setMenu(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FIXED FUNCTION
  const addToCart = (item) => {
  const size = selectedSize[item._id];
  const qty = quantity[item._id] || 1;

  if (!size) {
    alert("Select Single, x4 or x6");
    return;
  }

  const pricePerUnit = item.price?.[size];

  const cartItem = {
    _id: item._id,
    name: item.name,
    size,
    quantity: qty,
    price: pricePerUnit,
    total: pricePerUnit * qty,
  };

  console.log("ADD TO CART:", cartItem);

  addToCartContext(cartItem); // your cart function
};


  return (
    <div style={{ padding: "20px" }}>
      <h2>MENU</h2>

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

            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;