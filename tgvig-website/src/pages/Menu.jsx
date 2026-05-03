import { useEffect, useState } from "react";
import API from "../api/axios";

function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const res = await API.get("/menu?type=WEB");
      console.log("MENU:", res.data);
      setMenu(res.data);
    } catch (err) {
      console.log(err);
    }
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
    src={item.image.startsWith("http")
      ? item.image
      : `http://localhost:5000${item.image}`}
    alt=""
    width="100%"
    style={{ borderRadius: "6px" }}
  />
)}

            <h3>{item.name}</h3>
            <p><b>{item.type}</b></p>

            {/* PRICES */}
            <p>Single: R{item.price?.single}</p>
            <p>x4: R{item.price?.x4}</p>
            <p>x6: R{item.price?.x6}</p>

            {/* SPECIAL */}
            {item.type === "SPECIAL" && (
              <>
                <p> Points: {item.rewards?.points}</p>
                <p> Reward: {item.rewards?.itemReward}</p>
                <p> Discount: {item.rewards?.discount}%</p>
              </>
            )}

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