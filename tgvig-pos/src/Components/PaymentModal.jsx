function PaymentModal({ total, onPay }) {
  return (
    <div style={{ border: "1px solid #000", padding: 20 }}>
      <h3>Confirm Payment</h3>
      <p>Total: R{total}</p>

      <button onClick={onPay}>Pay Now</button>
    </div>
  );
}

export default PaymentModal;