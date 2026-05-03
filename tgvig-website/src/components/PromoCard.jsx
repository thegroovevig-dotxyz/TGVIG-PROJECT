function PromoCard({ promo, onSelect }) {
  return (
    <div
      style={{
        border: "1px solid orange",
        padding: "10px",
        borderRadius: "6px",
      }}
    >
      <h3>{promo.title}</h3>
      <p>{promo.description}</p>
      <p>Discount: {promo.discount}%</p>

      <button onClick={() => onSelect(promo)}>
        Use Offer
      </button>
    </div>
  );
}

export default PromoCard;