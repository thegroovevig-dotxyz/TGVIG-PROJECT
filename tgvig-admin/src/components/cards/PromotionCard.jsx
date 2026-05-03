function PromotionCard({ promo, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <img src={promo.image} width="120" alt="" />

      <h4>{promo.name}</h4>
      <p>Type: {promo.type}</p>
      <p>Value: {promo.value}</p>

      <button onClick={() => onDelete(promo._id)}>
        Delete
      </button>
    </div>
  );
}

export default PromotionCard;