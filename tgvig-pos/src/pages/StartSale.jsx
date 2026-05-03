import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import API from "../api/axios";
import { useParams } from "react-router-dom";

function StartSale() {
  const [menu, setMenu] = useState([]);
  const [promos, setPromos] = useState([]);
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

    const promoRes = await API.get("/promotions?clubId=${clubId}&deviceId=${deviceId}&type=POS");


    console.log("✅ RESPONSE:", res.data);
    setMenu(res.data);
    setPromos(promoRes.data);

  } catch (err) {
    console.log("❌ ERROR:", err?.response?.data || err.message);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>START SALE</h2>

      {/* ================= PROMOTIONS ================= */}
<h3>Promotions</h3>

<div style={{ display: "grid", gap: "10px" }}>
  {promos.map((p) => {
    const isRushHour = p.type === "RUSH_HOUR";

    return (
      <div
        key={p._id}
        style={{ border: "1px solid #ccc", padding: "10px" }}
      >
        {p.image && (
      <img
        src={p.image}
        alt={p.title}
        style={{ width: "120px", height: "120px", objectFit: "cover" }}
      />
    )}

        <h4>{p.title}</h4>
        <p>Type: {p.type}</p>

        {/* 🔥 TURN DESCRIPTION INTO SELECTABLE LIST */}
        {p.items && Array.isArray(p.items) && (
          <ul>
            {p.items.map((item, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name={`promo-${p._id}`}
                    disabled={!isRushHour}
                    onChange={() => {
                      p.selectedItem = item;
                    }}
                  />
                  {item}
                </label>
              </li>
            ))}
          </ul>
        )}

        {/* ADD TO CART RULE */}
        <button
          disabled={!isRushHour}
          onClick={() =>
            addToCart({
              _id: p._id,
              name: p.title,
              type: "PROMOTION",
              selectedItem: p.selectedItem || null,
              price: 0,
            })
          }
        >
          {isRushHour ? "Add Selected Item" : "Not Available"}
        </button>
      </div>
    );
  })}
</div>

      <hr />

      {/* ================= MENU ================= */}
      <h3>Menu</h3>

      <div style={{ display: "grid", gap: "10px" }}>
        {menu.map((item) => (
          <div
            key={item._id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            {item.image && (
      <img
        src={item.image}
        alt={item.title}
        style={{ width: "120px", height: "120px", objectFit: "cover" }}
      />
    )}

            <h4>{item.name}</h4>
            <p>Type: {item.type}</p>
            <p>Tier: {item.tier}</p>

            {/* PRICES (FIXED STRUCTURE) */}
            <p>Single: R {item.price?.single}</p>
            <p>x4: R {item.price?.x4}</p>
            <p>x6: R {item.price?.x6}</p>

            {/* SPECIAL REWARDS */}
            {item.type === "SPECIAL" && (
              <div>
                <p>Points: {item.rewards?.points}</p>
                <p>Item Reward: {item.rewards?.itemReward}</p>
                <p>Discount: {item.rewards?.discount}%</p>
              </div>
            )}

            <button onClick={() =>
              addToCart({
                ...item,
                price: item.price?.single || 0
              })
            }>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StartSale;