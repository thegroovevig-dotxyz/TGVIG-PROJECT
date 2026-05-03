import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";

function MenuGrid() {
  const [menu, setMenu] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const { addToCart } = useCart();

  const { clubId, deviceId } = useParams();

  useEffect(() => {
    console.log("🔥 SELF POS mounted");

    if (!clubId || !deviceId) {
      console.log("⛔ Missing params:", { clubId, deviceId });
      return;
    }

    loadData();
  }, [clubId, deviceId]);

  const loadData = async () => {
    try {
      console.log("PARAMS:", { clubId, deviceId });

      const menuRes = await API.get(
  `/menu?clubId=${clubId}&deviceId=${deviceId}&type=SELF_POS`
);

      console.log("MENU:", menuRes.data);
      setMenu(menuRes.data);

      const promoRes = await API.get(`/promotions?clubId=${clubId}`);
      setPromotions(promoRes.data);

    } catch (err) {
      console.log("❌ ERROR:", err?.response?.data || err.message);
    }
  };

  const clubPromos = promotions.filter(
    (p) => p.clubId === clubId || p.clubId?._id === clubId
  );

  return (
    <div>
      <h2>MENU</h2>

      {menu.map((item) => (
  <div key={item._id} style={{ margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
    
    <img src={item.image} alt="" width="100" />

    <p><b>{item.name}</b></p>
    <p>Type: {item.type}</p>

    <p>Single: R{item.price?.single}</p>
    <p>x4: R{item.price?.x4}</p>
    <p>x6: R{item.price?.x6}</p>

    {item.type === "SPECIAL" && (
      <>
        <p>Points: {item.rewards?.points}</p>
        <p>Item Reward: {item.rewards?.itemReward}</p>
        <p>Discount: {item.rewards?.discount}%</p>
      </>
    )}

          <button onClick={() => addToCart(item)}>
            Add
          </button>

<h2>PROMOTIONS</h2>

{clubPromos.map((promo) => (
  <div key={promo._id} style={{ marginBottom: "10px" }}>
    
    {promo.image && (
      <img src={promo.image} width="100" alt="" />
    )}

    <p>{promo.title}</p>
    <p>{promo.type}</p>

  
  </div>
))}

        </div>
      ))}
    </div>
  );
}

export default MenuGrid;