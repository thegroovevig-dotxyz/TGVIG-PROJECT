import { useEffect, useState } from "react";

function POS() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found, please login");
      return;
    }

    setUser(storedUser);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>PROFILE</h2>

      {user && (
        <div>
          <h3>{user.name}</h3>
          <p>Membership: {user.membershipNo}</p>
          <p>Wallet: R{user.walletBalance}</p>
          <p>Points: {user.pointsBalance}</p>
        </div>
      )}

      
    </div>
  );
}

export default POS;