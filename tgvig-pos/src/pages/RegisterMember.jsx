import { useState } from "react";
import API from "../api/axios";

function RegisterMember() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    idNumber: "",
    nationality: "",
    address: "",
  });

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      setLoading(true);

      const res = await API.post("/members/register", form);

      setResult(res.data.data);
      setMessage(res.data.message);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const reset = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      idNumber: "",
      nationality: "",
      address: "",
    });
    setResult(null);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>REGISTER MEMBER (POS)</h2>

      {/* FORM */}
      <input placeholder="First Name" onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
      <input placeholder="Last Name" onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />

      <input
        placeholder="Password (SpeedPoint Entry)"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input placeholder="ID Number" onChange={(e) => setForm({ ...form, idNumber: e.target.value })} />
      <input placeholder="Nationality" onChange={(e) => setForm({ ...form, nationality: e.target.value })} />
      <input placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />

      <br /><br />

      <button onClick={register} disabled={loading}>
        {loading ? "Creating..." : "Create Member"}
      </button>

      <button onClick={reset} style={{ marginLeft: 10 }}>
        Reset
      </button>

      {/* 🔥 FULL SUCCESS MESSAGE */}
      {message && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#d4edda" }}>
          <b>{message}</b>
        </div>
      )}

      {/* 🔥 MEMBERSHIP CARD OUTPUT */}
      {result && (
        <div
          style={{
            marginTop: "20px",
            width: "350px",
            height: "200px",
            position: "relative",
            background: "#111",
            color: "white",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h3>{form.firstName} {form.lastName}</h3>

          <p><b>Membership No:</b> {result.membershipNo}</p>
          <p><b>PIN:</b> {result.pin}</p>
          <p><b>Referral:</b> {result.referralNumber}</p>

          {/* QR */}
          {result.qrCode && (
            <img
              src={result.qrCode}
              alt="QR"
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                width: "80px",
                background: "white",
                padding: "4px",
                borderRadius: "4px"
              }}
            />
          )}

          <div style={{ position: "absolute", bottom: 10, left: 10 }}>
            <small>Status: ACTIVE</small><br />
            <small>Wallet: R0</small><br />
            <small>Points: 0</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterMember;