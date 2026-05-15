import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";

function PayoutsPage() {

  const [payouts, setPayouts] = useState([]);

  useEffect(() => {

    API
      .get("/payouts")
      .then((res) => {
        setPayouts(res.data.payouts);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>

      <h1>💸 Payouts</h1>

      {payouts.map((payout) => (
        <div
          key={payout._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p>Amount: R{payout.partnerPayout}</p>
          <p>Status: {payout.payoutStatus}</p>
        </div>
      ))}

    </div>
  );
}

export default PayoutsPage;