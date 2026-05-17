import { useEffect, useState } from "react";
import API from "../../services/api";

export default function PartnerBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings")
      .then((res) => setBookings(res.data.bookings || []))
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>Bookings</h2>

      {bookings.map((b) => (
        <div key={b._id}>
          <p>Status: {b.status}</p>
          <p>Total: R{b.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}