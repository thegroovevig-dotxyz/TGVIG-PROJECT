function CartItem({ item, remove }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>
        {item.name} - R{item.price}
      </p>

      <button onClick={() => remove(item._id)}>X</button>
    </div>
  );
}

export default CartItem;