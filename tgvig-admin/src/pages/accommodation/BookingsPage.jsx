import { useEffect, useState } from "react";
import axios from "axios";

function BookingsPage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    axios
      .get("/API/bookings/")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>

      <h1>📅 Bookings</h1>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p>Status: {booking.status}</p>
          <p>Total: R{booking.totalAmount}</p>
        </div>
      ))}

    </div>
  );
}

export default BookingsPage;