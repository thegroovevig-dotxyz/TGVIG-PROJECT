import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>ORDER SUCCESSFUL 🎉</h2>

      <button onClick={() => navigate("/")}>
        New Order
      </button>
    </div>
  );
}

export default OrderSuccess;