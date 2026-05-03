import { useEffect, useState } from "react";
import API from "../api/axios";
import { authService } from "../auth/authService";

function Events() {
  const [events, setEvents] = useState([]);
  const user = authService.getUser();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await API.get("/events");
    setEvents(res.data);
  };

  const buyTicket = async (ticketId, paymentType) => {
    try {
      const res = await API.post("/events/buy", {
        memberId: user._id,
        ticketId,
        paymentType,
      });

      alert("Ticket purchased!");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error buying ticket");
    }
  };

  return (
    <div>
      <h2>Events</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        {events.map((e) => (
          <div key={e._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={e.image} width="120" />

            <h4>{e.eventName}</h4>
            <p>R{e.priceCash}</p>
            <p>{e.pricePoints} pts</p>

            <button onClick={() => buyTicket(e._id, "WALLET")}>
              Buy (Wallet)
            </button>

            <button onClick={() => buyTicket(e._id, "POINTS")}>
              Buy (Points)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;