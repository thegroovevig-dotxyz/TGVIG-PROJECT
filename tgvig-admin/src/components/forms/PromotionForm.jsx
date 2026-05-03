import { useState } from "react";

function PromotionForm({ onCreate, clubs }) {
  const [form, setForm] = useState({
    clubId: "",
    title: "",
    type: "RUSH_HOUR",
    image: "",
    eventDate: ""
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCreate(form);
      }}
    >

      {/* CLUB */}
      <select
        value={form.clubId}
        onChange={(e) => setForm({ ...form, clubId: e.target.value })}
      >
        <option value="">Select Club</option>
        {clubs?.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* TYPE (THIS IS YOUR MISSING BUTTON ISSUE) */}
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="RUSH_HOUR">Rush Hour</option>
        <option value="EVENT">Event</option>
      </select>

      {/* TITLE */}
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* IMAGE */}
      <input
        placeholder="Image"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      {/* EVENT DATE */}
      {form.type === "EVENT" && (
        <input
          type="date"
          value={form.eventDate}
          onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
        />
      )}

      {/* 🔥 THIS IS YOUR BUTTON (it WILL show now) */}
      <button type="submit">
        Create Promotion
      </button>

    </form>
  );
}

export default PromotionForm;