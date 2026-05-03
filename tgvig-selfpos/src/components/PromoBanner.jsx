function PromoBanner({ promo }) {
  if (!promo) return null;

  return (
    <div
      style={{
        background: "orange",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
      }}
    >
      <strong>{promo.title}</strong> - {promo.description}
    </div>
  );
}

export default PromoBanner;