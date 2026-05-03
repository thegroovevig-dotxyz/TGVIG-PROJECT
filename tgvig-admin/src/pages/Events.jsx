import { useEffect, useState } from "react";
import { getClubs } from "../api/clubs.api";
import { getEvents, createEvent } from "../api/event.api";

function Events() {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    clubId: "",
    eventName: "",
    venue: "",
    priceCash: 0,
    pricePoints: 0,
  });

  useEffect(() => {
    loadClubs();
    loadEvents();
  }, []);

  const loadClubs = async () => {
    const res = await getClubs();
    setClubs(res.data);
  };

  const loadEvents = async () => {
    const res = await getEvents();
    setEvents(res.data);
  };

  const handleCreate = async () => {
    await createEvent(form);
    loadEvents();
  };

  return (
    <div>
      <h2>Events</h2>

      <select
        onChange={(e) =>
          setForm({ ...form, clubId: e.target.value })
        }
      >
        <option>Select Club</option>
        {clubs.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Event Name"
        onChange={(e) =>
          setForm({ ...form, eventName: e.target.value })
        }
      />

      <input
        placeholder="Venue"
        onChange={(e) =>
          setForm({ ...form, venue: e.target.value })
        }
      />

      <input
        placeholder="Cash Price"
        onChange={(e) =>
          setForm({ ...form, priceCash: e.target.value })
        }
      />

      <input
        placeholder="Points Price"
        onChange={(e) =>
          setForm({ ...form, pricePoints: e.target.value })
        }
      />

      <button onClick={handleCreate}>Create Event</button>

      {events.map((e) => (
        <div key={e._id}>
          <p>{e.eventName}</p>
          <p>{e.venue}</p>
        </div>
      ))}
    </div>
  );
}

export default Events;