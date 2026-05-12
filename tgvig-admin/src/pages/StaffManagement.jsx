import { useEffect, useState } from "react";
import API from "../api/axios";
import { getMembers, updateMember } from "../api/members.api";

function StaffManagement() {
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [clubs, setClubs] = useState([]);

  const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",

  clubId: "",
  deviceId: "",
  position: "OPERATOR",
});

  useEffect(() => {
    loadUsers();
    loadDevices();
    loadClubs();
  }, []);

  // 🔥 LOAD STAFF
  const loadUsers = async () => {
    const res = await getMembers();

    console.log("ALL USERS FROM API:", res.data);

    const staffOnly = res.data.filter(
  (u) =>
    u.role?.toLowerCase() === "staff" ||
    u.role?.toLowerCase() === "admin"
);
console.log("RAW USERS ROLES:", res.data.map(u => u.role));

    console.log("FILTERED STAFF:", staffOnly);

    setUsers(staffOnly);
  };

  // 🔥 LOAD DEVICES
  const loadDevices = async () => {
    try {
      const res = await API.get("/devices");
      setDevices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadClubs = async () => {
  try {
    const res = await API.get("/clubs");
    setClubs(res.data);
  } catch (err) {
    console.log(err);
  }
};

  // 🔥 CREATE STAFF
  const createStaff = async () => {
    try {
      await API.post("/members/register", {
  ...form,

  role: "STAFF",

  clubId: form.clubId,
  deviceId: form.deviceId,
  position: form.position,
});


      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
clubId: "",
  deviceId: "",
  position: "OPERATOR",
      });

      loadUsers();
    } catch (err) {
      console.log(err);
      alert("Failed to create staff");
    }
  };

  // 🔥 CHANGE ROLE
  const changeRole = async (id, role) => {
    await updateMember(id, { role });
    loadUsers();
  };

  // 🔥 DELETE
  const deleteUser = async (id) => {
    await API.delete(`/members/${id}`);
    loadUsers();
  };

  // 🔥 ASSIGN DEVICE
  const assignDevice = async (userId, deviceId) => {
    try {
      await API.put(`/members/${userId}`, { deviceId });
      alert("Device assigned");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Staff Management</h2>
{/* 🔥 ADD STAFF */}
<div style={{ marginBottom: "20px" }}>
  <h3>Add Staff</h3>

  <input
    placeholder="First Name"
    value={form.firstName}
    onChange={(e) =>
      setForm({ ...form, firstName: e.target.value })
    }
  />

  <input
    placeholder="Last Name"
    value={form.lastName}
    onChange={(e) =>
      setForm({ ...form, lastName: e.target.value })
    }
  />

  <input
    placeholder="Email"
    value={form.email}
    onChange={(e) =>
      setForm({ ...form, email: e.target.value })
    }
  />

  <input
    placeholder="Password"
    type="password"
    value={form.password}
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
  />

  {/* 🔥 CLUB */}
  <select
    value={form.clubId}
    onChange={(e) =>
      setForm({ ...form, clubId: e.target.value })
    }
  >
    <option value="">Select Club</option>

    {clubs.map((c) => (
      <option key={c._id} value={c._id}>
        {c.name}
      </option>
    ))}
  </select>

  {/* 🔥 DEVICE */}
  <select
    value={form.deviceId}
    onChange={(e) =>
      setForm({ ...form, deviceId: e.target.value })
    }
  >
    <option value="">Select Device</option>

    {devices
      .filter((d) => d.clubId?._id === form.clubId)
      .map((d) => (
        <option key={d._id} value={d._id}>
          {d.name}
        </option>
      ))}
  </select>

  {/* 🔥 POSITION */}
  <select
    value={form.position}
    onChange={(e) =>
      setForm({ ...form, position: e.target.value })
    }
  >
    <option value="OPERATOR">Operator</option>
    <option value="MONITOR">Monitor</option>
    <option value="SELF_POS">Self POS</option>
  </select>

  <button onClick={createStaff}>
    Create Staff
  </button>
</div>

{/* 🔥 TABLE */}
<table border="1" width="100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Device</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {users.map((u) => (
      <tr key={u._id}>
        <td>
          {u.firstName} {u.lastName}
        </td>

        <td>{u.email}</td>

        <td>{u.role}</td>

        <td>
          {devices.find((d) => d._id === u.deviceId)?.name ||
            "No Device"}
        </td>

        <td>
          <button onClick={() => deleteUser(u._id)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>     
    </div>
  );
}

export default StaffManagement;