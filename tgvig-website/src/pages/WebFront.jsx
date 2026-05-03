import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import WebNavbar from "../layout/WebNavbar";

function WebFront() {
  const [about, setAbout] = useState({});
  const [rewards, setRewards] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [venues, setVenues] = useState([]);
  const [support, setSupport] = useState({});
  const [privacy, setPrivacy] = useState({});
  const [terms, setTerms] = useState({});
  const [contact, setContact] = useState({});
  const [socials, setSocials] = useState([]);
  const navigate = useNavigate();

  const load = async (section, setter, isArray = false) => {
    try {
      const res = await API.get(`/webcontent/${section}`);
      const data = res.data?.content;

      setter(data || (isArray ? [] : {}));
    } catch (err) {
      console.log("Error loading:", section);
      setter(isArray ? [] : {});
    }
  };

  useEffect(() => {
    load("about", setAbout);
    load("webRewards", setRewards, true);
    load("benefits", setBenefits, true);
    load("venues", setVenues, true);
    load("support", setSupport);
    load("privacy", setPrivacy);
    load("terms", setTerms);
    load("contact", setContact);
    load("socials", setSocials, true);
  }, []);

  

  return (
    <>
     <WebNavbar />
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>

{/* TOP HEADER */}
<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  borderBottom: "1px solid #ddd",
  position: "sticky",
  top: 0,
  background: "white",
  zIndex: 1000
}}>

  {/* LEFT - LOGO CENTERED */}
  <div style={{ flex: 1, textAlign: "center" }}>
    <img
      src="/logo.png"
      alt="logo"
      style={{ height: "50px" }}
    />
  </div>

  {/* RIGHT - AUTH BUTTONS */}
  <div style={{ display: "flex", gap: "10px" }}>

    <button onClick={() => navigate("/login")}>
      Login
    </button>

    <button onClick={() => navigate("/register")}>
      Register
    </button>

    <button
      onClick={() => navigate("/register")}
      style={{
        background: "gold",
        fontWeight: "bold"
      }}
    >
      Join Free
    </button>

  </div>

</div>

      {/* 🟡 ABOUT */}
      <section>
        <h1>{about.title || "The Groove VIG"}</h1>
        {about.image && <img src={about.image} width="100%" />}
        <p>{about.description}</p>
      </section>

      <hr />

      {/* 🎁 REWARDS */}
      <section>
        <h2>Rewards</h2>

        {rewards.map((r, i) => (
          <div key={i}>
            {r.image && <img src={r.image} width="200" />}
            <h3>{r.title}</h3>
            <p>{r.description}</p>
          </div>
        ))}
      </section>

      <hr />

      {/* 💎 BENEFITS */}
      <section>
        <h2>Benefits</h2>

        {benefits.map((b, i) => (
          <div key={i}>
            {b.image && <img src={b.image} width="200" />}
            <h3>{b.title}</h3>
            <p>{b.description}</p>
          </div>
        ))}
      </section>

      <hr />

      {/* 📍 VENUES */}
      <section>
        <h2>Venues</h2>

        {venues.map((v, i) => (
          <div key={i}>
            {v.image && <img src={v.image} width="250" />}
            <h3>{v.title}</h3>
            <p>{v.description}</p>
          </div>
        ))}
      </section>

      <hr />

      {/* 🛠 SUPPORT */}
      <section>
        <h2>Support</h2>
        <p>{support.description}</p>
      </section>

      <hr />

      {/* 🔒 PRIVACY */}
      <section>
        <h2>Privacy Policy</h2>
        <p>{privacy.description}</p>
      </section>

      <hr />

      {/* 📜 TERMS */}
      <section>
        <h2>Terms & Conditions</h2>
        <p>{terms.description}</p>
      </section>

      <hr />

      {/* 📞 CONTACT */}
      <section>
        <h2>Contact</h2>
        <p>{contact.description}</p>
      </section>

      <hr />

      {/* 🌍 SOCIALS */}
      <section>
        <h2>Follow Us</h2>

        {socials.map((s, i) => (
          <div key={i}>
            {s.image && <img src={s.image} width="50" />}
            <p>{s.title}</p>
          </div>
        ))}
      </section>

    </div>
    </>
  );
}

export default WebFront;