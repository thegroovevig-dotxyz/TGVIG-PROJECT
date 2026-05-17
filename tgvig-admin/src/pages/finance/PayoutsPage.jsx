import { useEffect, useState } from "react";
import API from "../../services/api";

function PayoutsPage() {

  const [payouts, setPayouts] = useState([]);

  useEffect(() => {

    API.get("/payouts/all")
      .then((res) => {
        setPayouts(res.data.payouts || []);
      })
      .catch((err) => {
        console.log(err);
        setPayouts([]);
      });

  }, []);

  return (
    <div>
      <h1>💸 Payouts</h1>

      {payouts.map((payout) => (
        <div key={payout._id}>
          <p>{payout.status}</p>
        </div>
      ))}
    </div>
  );
}

export default PayoutsPage;