function CartItem({ item, onRemove }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ddd",
        padding: "8px 0",
      }}
    >
      <span>
        {item.name} - R {item.price}
      </span>

      <button onClick={() => onRemove(item._id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;