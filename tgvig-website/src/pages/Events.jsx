import { useEffect, useState } from "react";
import API from "../api/axios";
import { authService } from "../auth/authService";

function Events() {
  const [events, setEvents] = useState([]);
  const user = authService.getUser();
const [cart, setCart] = useState([]);
const [pin, setPin] = useState("");
const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await API.get("/events");
    setEvents(res.data);
  };

const buyTicket = async (ticket, paymentType) => {
  try {
    if (!user?._id) {
      alert("Login required");
      return;
    }

    console.log("USER:", user);
    console.log("TICKET:", ticket);

    const payload = {
      memberId: user._id,
      ticketId: ticket._id,
      paymentType,
      pin,
    };

    console.log("PAYLOAD:", payload);

    const res = await API.post("/events/buy", payload);

    console.log("SUCCESS:", res.data);

    alert("Ticket purchased!");
  } catch (err) {
    console.log("FULL ERROR:", err);
    console.log("SERVER ERROR:", err.response?.data);

    alert(err.response?.data?.message || "Server error");
  }
};

  

  const openPinModal = (ticket) => {
  setSelectedTicket(ticket);
};

  const addToCart = (ticket) => {
  setCart((prev) => [...prev, ticket]);
};

  return (
  <div>
    <h2>Events</h2>

    <input
      type="password"
      placeholder="Enter Membership PIN"
      value={pin}
      onChange={(e) => setPin(e.target.value)}
    />

    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {events.map((e) => (
        <div
          key={e._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "220px",
          }}
        >
          <img src={e.image} width="120" />

          <h4>{e.eventName}</h4>

          <p>Cash: R{e.priceCash}</p>

          <p>Points: {e.pricePoints}</p>

          <button onClick={() => addToCart(e)}>
            Add To Cart
          </button>

          <button onClick={() => buyTicket(e, "WALLET")}>
            Buy Wallet
          </button>

          <button onClick={() => buyTicket(e, "POINTS")}>
            Buy Points
          </button>
        </div>
      ))}
    </div>

    <hr />

    <h3>Ticket Cart</h3>

    {cart.length === 0 && <p>No tickets in cart</p>}

    {cart.map((t) => (
      <div
        key={t._id}
        style={{
          border: "1px solid gray",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        <h4>{t.eventName}</h4>

        <p>R{t.priceCash}</p>
      </div>
    ))}
  </div>
);
}

export default Events;