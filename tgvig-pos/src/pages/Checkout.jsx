import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart } = useCart();

  const [memberNo, setMemberNo] = useState("");
  const [pin, setPin] = useState("");
  const [coupon, setCoupon] = useState("");

  const subTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const vat = subTotal * 0.15;

  // 🔥 COUPON DISCOUNT LOGIC
  let discount = 0;

  if (coupon.startsWith("MENU")) discount = 0.1; // 10%
  if (coupon.startsWith("TABLE")) discount = 0.15; // 15%
  if (coupon.startsWith("EVENT")) discount = 0.2; // 20%

  const discountAmount = subTotal * discount;
  const total = subTotal + vat - discountAmount;

  const pay = (method) => {
    alert(
      `Paid via ${method}\nTotal: R${total.toFixed(
        2
      )}\nCoupon: ${coupon || "NONE"}`
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>POS CHECKOUT</h3>

      {/* MEMBER AUTH */}
      <input
        placeholder="Member No / Scan Card"
        value={memberNo}
        onChange={(e) => setMemberNo(e.target.value)}
      />

      <input
        type="password"
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />

      {/* 🔥 COUPON INPUT (NEW) */}
      <input
        placeholder="Enter Coupon (MENU / TABLE / EVENT)"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value.toUpperCase())}
      />

      <hr />

      {/* TOTAL BREAKDOWN */}
      <p>Subtotal: R{subTotal.toFixed(2)}</p>
      <p>VAT (15%): R{vat.toFixed(2)}</p>
      <p>Discount: -R{discountAmount.toFixed(2)}</p>

      <h3>TOTAL: R{total.toFixed(2)}</h3>

      {/* PAYMENT METHODS */}
      <button onClick={() => pay("WALLET")}>Pay Wallet</button>
      <button onClick={() => pay("POINTS")}>Pay Points</button>
      <button onClick={() => pay("SPEEDPOINT")}>Pay SpeedPoint</button>
      <button onClick={() => pay("CASH")}>Pay Cash</button>
    </div>
  );
}

export default Checkout;