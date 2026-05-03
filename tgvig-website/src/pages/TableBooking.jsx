import { useEffect, useState } from "react";
import { getClubs } from "../api/clubs.api";

export default function TableBooking() {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    try {
      const res = await getClubs();
      setClubs(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Table Booking</h2>

      {clubs.map((c) => (
        <div
          key={c._id}
          onClick={() => setSelectedClub(c)}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          <img
            src={c.image || "https://via.placeholder.com/100"}
            width="100"
          />
          <p>{c.name}</p>
        </div>
      ))}

      {selectedClub && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected: {selectedClub.name}</h3>
        </div>
      )}
    </div>
  );
}