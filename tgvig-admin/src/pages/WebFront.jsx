import { useEffect, useState } from "react";
import API from "../api/axios";

function WebFront() {
  const [about, setAbout] = useState({});
  const [rewards, setRewards] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [venues, setVenues] = useState([]);
  const [support, setSupport] = useState({});
  const [privacy, setPrivacy] = useState({});
  const [terms, setTerms] = useState({});
  const [contact, setContact] = useState({});
  const [socials, setSocials] = useState({});
  const [data, setData] = useState([]);

   useEffect(() => {
  load("about", setAbout);
  load("webRewards", setRewards, true);
  load("benefits", setBenefits, true);
  load("venues", setVenues, true);
  load("support", setSupport);     // OBJECT
  load("privacy", setPrivacy);     // OBJECT
  load("terms", setTerms);         // OBJECT
  load("contact", setContact);     // OBJECT
  load("socials", setSocials, true);
}, []);

  const load = async (section, setter, isArray = false) => {
  try {
    const res = await API.get(`/webcontent/${section}`);
    setter(res.data?.content || (isArray ? [] : {}));
  } catch (err) {
    console.log(`No ${section}`);
    setter(isArray ? [] : {});
  }
};


    const save = async (section, data) => {
    try {
      await API.post(`/webcontent/${section}`, {
        content: data,
      });

      alert(`${section} saved`);
    } catch (err) {
      console.log(err);
    }
  };

    return (
    <div style={{ padding: "20px" }}>
      <h2>WEB FRONT ADMIN</h2>

      <h3>About</h3>

      <input
        placeholder="Title"
        value={about.title || ""}
        onChange={(e) =>
          setAbout({ ...about, title: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={about.description || ""}
        onChange={(e) =>
          setAbout({ ...about, description: e.target.value })
        }
      />

      <input
        placeholder="Image URL"
        value={about.image || ""}
        onChange={(e) =>
          setAbout({ ...about, image: e.target.value })
        }
      />

      {about.image && (
        <img src={about.image} width="120" />
      )}

      <button onClick={() => save("about", about)}>
        Save About
      </button>

            <hr />
<h3>Rewards</h3>

{rewards.map((r, i) => (
  <div key={i} style={{ marginBottom: 10 }}>
    <input
      placeholder="Title"
      value={r.title || ""}
      onChange={(e) => {
        const updated = [...rewards];
        updated[i] = { ...updated[i], title: e.target.value };
        setRewards(updated);
      }}
    />

    <input
      placeholder="Description"
      value={r.description || ""}
      onChange={(e) => {
        const updated = [...rewards];
        updated[i] = { ...updated[i], description: e.target.value };
        setRewards(updated);
      }}
    />

    <input
      placeholder="Image"
      value={r.image || ""}
      onChange={(e) => {
        const updated = [...rewards];
        updated[i] = { ...updated[i], image: e.target.value };
        setRewards(updated);
      }}
    />

    {r.image && <img src={r.image} width="80" />}

    <button
      onClick={() =>
        setRewards(rewards.filter((_, idx) => idx !== i))
      }
    >
      Delete
    </button>
  </div>
))}

<button
  onClick={() =>
    setRewards([
      ...rewards,
      { title: "", description: "", image: "" },
    ])
  }
>
  Add Reward
</button>

<button onClick={() => save("rewards", rewards)}>
  Save Rewards
</button>

            <hr />
      <h3>Benefits</h3>

      {benefits.map((b, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <input
            placeholder="Title"
            value={b.title || ""}
            onChange={(e) => {
              const updated = [...benefits];
              updated[i].title = e.target.value;
              setBenefits(updated);
            }}
          />

          <input
            placeholder="Description"
            value={b.description || ""}
            onChange={(e) => {
              const updated = [...benefits];
              updated[i].description = e.target.value;
              setBenefits(updated);
            }}
          />

          <input
            placeholder="Image"
            value={b.image || ""}
            onChange={(e) => {
              const updated = [...benefits];
              updated[i].image = e.target.value;
              setBenefits(updated);
            }}
          />

          {b.image && <img src={b.image} width="80" />}

          <button
            onClick={() =>
              setBenefits(benefits.filter((_, idx) => idx !== i))
            }
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          setBenefits([
            ...benefits,
            { title: "", description: "", image: "" },
          ])
        }
      >
        Add Benefits
      </button>

      <button onClick={() => save("benefits", benefits)}>
        Save Benefits
      </button>

            <hr />
      <h3>Venues</h3>

      {venues.map((v, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <input
            placeholder="Title"
            value={v.title || ""}
            onChange={(e) => {
              const updated = [...venues];
              updated[i].title = e.target.value;
              setVenues(updated);
            }}
          />

          <input
            placeholder="Description"
            value={v.description || ""}
            onChange={(e) => {
              const updated = [...venues];
              updated[i].description = e.target.value;
              setVenues(updated);
            }}
          />

          <input
            placeholder="Image"
            value={v.image || ""}
            onChange={(e) => {
              const updated = [...venues];
              updated[i].image = e.target.value;
              setVenues(updated);
            }}
          />

          {v.image && <img src={v.image} width="80" />}

          <button
            onClick={() =>
              setVenues(venues.filter((_, idx) => idx !== i))
            }
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          setVenues([
            ...venues,
            { title: "", description: "", image: "" },
          ])
        }
      >
        Add Venues
      </button>

      <button onClick={() => save("venues", venues)}>
        Save Venues
      </button>

            <hr />
      <h3>Support</h3>

<input
  placeholder="Email"
  value={support.email || ""}
  onChange={(e) =>
    setSupport({ ...support, email: e.target.value })
  }
/>

<input
  placeholder="Phone"
  value={support.phone || ""}
  onChange={(e) =>
    setSupport({ ...support, phone: e.target.value })
  }
/>

<input
  placeholder="Address"
  value={support.address || ""}
  onChange={(e) =>
    setSupport({ ...support, address: e.target.value })
  }
/>

<button onClick={() => save("support", support)}>
  Save Support
</button>

            <hr />
      <h3>Privacy</h3>

<textarea
  placeholder="Privacy Policy"
  value={privacy.text || ""}
  onChange={(e) =>
    setPrivacy({ ...privacy, text: e.target.value })
  }
/>

<button onClick={() => save("privacy", privacy)}>
  Save Privacy
</button>

            <hr />
      <h3>Terms</h3>

<textarea
  placeholder="Terms & Conditions"
  value={terms.text || ""}
  onChange={(e) =>
    setTerms({ ...terms, text: e.target.value })
  }
/>

<button onClick={() => save("terms", terms)}>
  Save Terms
</button>

            <hr />
      <h3>Contact</h3>

<input
  placeholder="Email"
  value={contact.email || ""}
  onChange={(e) =>
    setContact({ ...contact, email: e.target.value })
  }
/>

<input
  placeholder="Phone"
  value={contact.phone || ""}
  onChange={(e) =>
    setContact({ ...contact, phone: e.target.value })
  }
/>

<input
  placeholder="Address"
  value={contact.address || ""}
  onChange={(e) =>
    setContact({ ...contact, address: e.target.value })
  }
/>

<button onClick={() => save("contact", contact)}>
  Save Contact
</button>

            <hr />
      <h3>Socials</h3>

<input
  placeholder="Instagram"
  value={socials.instagram || ""}
  onChange={(e) =>
    setSocials({ ...socials, instagram: e.target.value })
  }
/>

<input
  placeholder="TikTok"
  value={socials.tiktok || ""}
  onChange={(e) =>
    setSocials({ ...socials, tiktok: e.target.value })
  }
/>

<input
  placeholder="Facebook"
  value={socials.facebook || ""}
  onChange={(e) =>
    setSocials({ ...socials, facebook: e.target.value })
  }
/>

<input
  placeholder="X (Twitter)"
  value={socials.x || ""}
  onChange={(e) =>
    setSocials({ ...socials, x: e.target.value })
  }
/>

<button onClick={() => save("socials", socials)}>
  Save Socials
</button>

       </div>   
  );
}

export default WebFront;