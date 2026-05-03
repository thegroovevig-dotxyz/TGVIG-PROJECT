import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    members: 0,
    transactions: 0,
    revenue: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h3>Members</h3>
          <p>{stats.members}</p>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h3>Transactions</h3>
          <p>{stats.transactions}</p>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h3>Revenue</h3>
          <p>R{stats.revenue}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;