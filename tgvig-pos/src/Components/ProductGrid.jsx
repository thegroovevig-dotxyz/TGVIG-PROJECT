import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";


function ProductGrid() {
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    loadMenu();
  }, []);


  const { deviceId, clubId } = useParams();

  const loadMenu = async () => {
    const res = await API.get("/menu/1"); // replace clubId later
    setItems(res.data || []);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {items.map((item) => (
        <div
          key={item._id}
          onClick={() => addToCart(item)}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10,
            width: 150,
            cursor: "pointer",
          }}
        >
          <h4>{item.name}</h4>
          <p>R {item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;