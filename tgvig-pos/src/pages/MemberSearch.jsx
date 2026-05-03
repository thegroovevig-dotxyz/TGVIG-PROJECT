import { useState } from "react";
import API from "../api/axios";

function MemberSearch() {
  const [query, setQuery] = useState("");
  const [member, setMember] = useState(null);

  const search = async () => {
  try {
    const res = await API.get(`/members?search=${query}`);

    const exactMatch = res.data?.find(
      (m) =>
        m.membershipNo === query &&
        m.role === "MEMBER"
    );

    setMember(exactMatch || null);

    if (!exactMatch) {
      alert("Member not found");
    }

  } catch (err) {
    console.log(err);
  }
};

  const generateCard = async (memberId) => {
    try {
      const res = await API.post(`/members/generate-card/${memberId}`);
      alert("Card generated successfully");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to generate card");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Member Search</h2>

      {/* SEARCH */}
      <input
        placeholder="Membership No."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={search}>Search</button>

      <hr />

      {/* SINGLE RESULT */}
      {member && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h3>
            {member.firstName} {member.lastName}
          </h3>

          <p>Email: {member.email}</p>
          <p>Membership: {member.membershipNo}</p>
          <p>Wallet: R {member.walletBalance}</p>
          <p>Points: {member.pointsBalance}</p>

          {/* QR */}
          {member.qrCode && (
            <img src={member.qrCode} alt="QR Code" width="100" />
          )}

          <button onClick={() => generateCard(member._id)}>
            Generate Membership Card
          </button>
        </div>
      )}
    </div>
  );
}

export default MemberSearch;