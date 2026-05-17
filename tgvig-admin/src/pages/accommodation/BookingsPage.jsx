import { useEffect, useState } from "react";
import API from "../../services/api";

function BookingsPage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    API.get("/bookings")
      .then((res) => {

        console.log(res.data);

        setBookings(res.data.bookings || res.data || []);

      })
      .catch((err) => {
        console.log(err);
        setBookings([]);
      });

  }, []);

  return (
    <div>

      <h1>📅 Bookings</h1>

      {bookings.map((booking) => (
        <div key={booking._id}>
          <p>Status: {booking.status}</p>
          <p>Total: R{booking.totalAmount}</p>
        </div>
      ))}

    </div>
  );
}

export default BookingsPage;