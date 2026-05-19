import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";



function DeviceManager() {
  const [devices, setDevices] = useState([]);
  const [clubs, setClubs] = useState([]);
 const [selectedClubId, setSelectedClubId] = useState("");
const [name, setName] = useState("");
const [selectedType, setSelectedType] = useState("POS");
  const [form, setForm] = useState({
    name: "",
    type: "POS", // POS | SELFPOS | MINIPOS
     clubId: selectedClubId
  });

  useEffect(() => {
    loadDevices();
  }, []);

  useEffect(() => {
  loadClubs();
}, []);

const loadClubs = async () => {
  try {
    const res = await API.get("/clubs");
    setClubs(res.data);
  } catch (err) {
    console.log(err);
  }
};

  const navigate = useNavigate();

  const loadDevices = async () => {
    const res = await API.get("/devices");
    setDevices(res.data);
  };

  const createDevice = async () => {
  console.log("SELECTED TYPE:", selectedType);

  if (!name.trim()) {
    alert("Enter device name");
    return;
  }

  if (!selectedClubId) {
    alert("Select a club");
    return;
  }

  try {
    const payload = {
      name: name.trim(),
      type: selectedType, // 🔥 NOW THIS IS CLEAR
      status: "ACTIVE",
      clubId: selectedClubId
    };

    console.log("DEVICE BODY:", payload);

    await API.post("/devices", payload);

    loadDevices();
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

  const updateStatus = async (id, status) => {
    await API.put(`/devices/${id}`, { status });
    loadDevices();
  };

  const openPOS = (d) => {
  window.location.href =
    `http://localhost:5174/start-sale/${d.clubId}/${d._id}`;
};

  const remove = async (id) => {
    await API.delete(`/devices/${id}`);
    loadDevices();
  };

  return (
    <div>
      <h2>POS & SELFPOS DEVICES</h2>

      {/* CREATE */}
      <select
  value={selectedClubId}
  onChange={(e) => setSelectedClubId(e.target.value)}
>
  <option value="">Select Club</option>

  {clubs.map((c) => (
    <option key={c._id} value={c._id}>
      {c.name}
    </option>
  ))}
</select>

      <select onChange={(e) => setSelectedType(e.target.value)}>
  <option value="POS">POS</option>
  <option value="SELFPOS">SELFPOS</option>
  <option value="MINIPOS">MINIPOS</option>
</select>
      <input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

      <button onClick={createDevice}>Add Device</button>

      <hr />

      {/* LIST */}
      {devices.map((d) => (
        <div key={d._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h4>{d.name}</h4>
<button
  onClick={() =>
    window.location(
      `http://localhost:5174/start-sale/${d.clubId}/${d._id}`,
    
    )
  }
>
  Open POS
</button>

          <p>Type: {d.type}</p>
         <p>Club: {d.clubId?.name}</p>
          <p>Status: {d.status}</p>

          

          <button onClick={() => updateStatus(d._id, "ACTIVE")}>Activate</button>
          <button onClick={() => updateStatus(d._id, "INACTIVE")}>Deactivate</button>
          <button onClick={() => remove(d._id)}>Delete</button>

        </div>
      ))}
    </div>
  );
}

export default DeviceManager;