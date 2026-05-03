function TierBadge({ tier }) {
  const colorMap = {
    BRONZE: "brown",
    SILVER: "gray",
    GOLD: "gold",
    VIP: "purple",
  };

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "4px",
        backgroundColor: colorMap[tier] || "black",
        color: "white",
      }}
    >
      {tier}
    </span>
  );
}

export default TierBadge;