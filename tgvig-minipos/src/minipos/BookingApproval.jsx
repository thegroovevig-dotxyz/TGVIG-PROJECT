import { useState } from "react";
import API from "../api/axios";

function BookingApproval() {
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState(null);

 const loadBooking = async () => {
  const res = await API.post("/VALIDATE-QR", {
    qrToken: bookingId,
    type: "PROPERTY",
  });

  setBooking(res.data.record);
};

  const approve = async () => {
    await API.put(`/bookings/${bookingId}`, {
      status: "CONFIRMED",
      paymentStatus: "PAID",
    });

    alert("Booking APPROVED");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>BOOKING APPROVAL</h2>

      <input
        placeholder="Booking ID"
        onChange={(e) => setBookingId(e.target.value)}
      />

      <button onClick={loadBooking}>Load</button>

      {booking && (
        <div>
          <pre>{JSON.stringify(booking, null, 2)}</pre>

          <button onClick={approve}>Approve</button>
        </div>
      )}
    </div>
  );
}

export default BookingApproval;