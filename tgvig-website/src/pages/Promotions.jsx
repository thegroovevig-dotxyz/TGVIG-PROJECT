import { useEffect, useState } from "react";
import { getPromotions } from "../api/promotions.api";
import { useNavigate } from "react-router-dom";

function Promotions() {
  const [promos, setPromos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPromos = async () => {
      try {
        const res = await getPromotions();
        setPromos(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadPromos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>PROMOTIONS</h2>

      <div style={{ display: "grid", gap: "15px" }}>
        {promos.map((promo) => (
          <div
            key={promo._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            {promo.image && (
  <img
    src={promo.image.startsWith("http")
      ? promo.image
      : `http://localhost:5000${promo.image}`}
    alt=""
    width="100%"
    style={{ borderRadius: "6px" }}
  />
)}

            <h3>{promo.title}</h3>

            <p> {promo.clubId?.name}</p>

            <p><b>{promo.type}</b></p>

            {promo.type === "RUSH_HOUR" && (
              <p> Active Now</p>
            )}

            {promo.type === "EVENT" && (
              <p> {new Date(promo.eventDate).toLocaleDateString()}</p>
            )}

            <p>{promo.description}</p>

            {/* OFFER */}
            {promo.value && (
              <p>
                💸 Value: <b>{promo.value}</b>
              </p>
            )}

            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Promotions;