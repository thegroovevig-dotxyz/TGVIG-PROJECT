import { useEffect, useState } from "react";
import API from "../api/axios";

import StatCard from "../components/cards/StatCard";

function Analytics() {
  const [data, setData] = useState({
    sales: 0,
    wallet: 0,
    transactions: 0,
    members: 0,
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const salesRes = await API.get("/analytics/sales");
      const walletRes = await API.get("/analytics/wallet");
      const txRes = await API.get("/transactions");
      const membersRes = await API.get("/members");

      setData({
        sales: salesRes.data.total || 0,
        wallet: walletRes.data.total || 0,
        transactions: txRes.data.length || 0,
        members: membersRes.data.length || 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Analytics Dashboard</h2>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <StatCard title="Total Sales" value={`R${data.sales}`} />
        <StatCard title="Wallet Balance" value={`R${data.wallet}`} />
        <StatCard title="Transactions" value={data.transactions} />
        <StatCard title="Members" value={data.members} />
      </div>
    </div>
  );
}

export default Analytics;