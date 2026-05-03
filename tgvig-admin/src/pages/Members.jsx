import { useEffect, useState } from "react";
import { getMembers } from "../api/members.api";
import { QRCodeCanvas } from "qrcode.react";

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const res = await getMembers();
    setMembers(res.data);
  };

  return (
    <div>
      <h2>Members</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Wallet</th>
            <th>Points</th>
            <th>Status</th>
            <th>QR Code</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td>{m.firstName}</td>
              <td>{m.email}</td>
              <td>{m.walletBalance}</td>
              <td>{m.pointsBalance}</td>
              <td>{m.status || "Active"}</td>
              
              <td>
                <QRCodeCanvas
                  value={m._id} // 🔥 what gets encoded
                  size={80}
                />
              </td>

<td>
  {m.status === "ACTIVE" && "🟢 ACTIVE"}
  {m.status === "SUSPENDED" && "🟠 SUSPENDED"}
  {m.status === "BLOCKED" && "🔴 BLOCKED"}
</td>

<td>
  <button onClick={() => setStatus(m._id, "ACTIVE")}>Activate</button>
  <button onClick={() => setStatus(m._id, "SUSPENDED")}>Suspend</button>
  <button onClick={() => setStatus(m._id, "BLOCKED")}>Block</button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Members;