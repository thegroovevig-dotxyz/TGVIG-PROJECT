function CartItem({ item, onRemove }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <span>{item.name} - R{item.price}</span>

      <button onClick={() => onRemove(item._id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;