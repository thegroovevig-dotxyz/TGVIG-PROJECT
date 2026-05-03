function ProductTile({ item, onAdd }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px",
        borderRadius: "8px",
        textAlign: "center",
        width: "150px",
      }}
    >
      <h4>{item.name}</h4>
      <p>R {item.price}</p>

      <button onClick={() => onAdd(item)}>
        Add
      </button>
    </div>
  );
}

export default ProductTile;