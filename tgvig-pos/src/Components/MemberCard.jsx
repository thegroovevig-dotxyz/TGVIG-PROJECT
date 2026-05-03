function MemberCard({ member }) {
  if (!member) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: 10 }}>
      <h4>{member.firstName} {member.lastName}</h4>
      <p>Wallet: R{member.walletBalance}</p>
      <p>Points: {member.pointsBalance}</p>
    </div>
  );
}

export default MemberCard;