function MenuCard({ item, onAdd }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "6px",
      }}
    >
      <h3>{item.name}</h3>
      <p>R {item.price}</p>

      <button onClick={() => onAdd(item)}>
        Add to Cart
      </button>
    </div>
  );
}

export default MenuCard;