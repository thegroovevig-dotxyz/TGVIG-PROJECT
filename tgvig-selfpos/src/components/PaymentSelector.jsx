function PaymentSelector({ onSelect }) {
  return (
    <div>
      <h3>Select Payment</h3>

      <button onClick={() => onSelect("wallet")}>
        Wallet
      </button>

      <button onClick={() => onSelect("points")}>
        Points
      </button>
    </div>
  );
}

export default PaymentSelector;