function WalletCard({ balance, points }) {
  return (
    <div
      style={{
        border: "1px solid green",
        padding: "10px",
        borderRadius: "6px",
      }}
    >
      <h3>Wallet</h3>
      <p>Balance: R {balance}</p>
      <p>Points: {points}</p>
    </div>
  );
}

export default WalletCard;