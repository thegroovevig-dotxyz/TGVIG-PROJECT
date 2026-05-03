import { useEffect, useState } from "react";
import { getOrders } from "../api/orders.api";
import { authService } from "../auth/authService";

function Orders() {
  const user = authService.getUser();

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await getOrders(user._id);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) loadOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>MY ORDERS</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h4>Order ID: {order._id}</h4>

            <p>Status: {order.status}</p>

            <p>Total: R {order.total}</p>

            <div>
              {order.items?.map((item, index) => (
                <p key={index}>
                  {item.name} - R {item.price}
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;