import { useState } from "react";
import { authService } from "./authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  "confirm password": "",
  phone: "",
  idNumber: "",
  nationality: "",
  address: "",

});

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await authService.register(form);

    console.log("REGISTER RESPONSE:", res);

    const { membershipNo, pin, referralNumber, qrCode } = res.data;

    alert(
      `Account created!\n\nMembership: ${membershipNo}\nPIN: ${pin}\nReferral: ${referralNumber}\nqrCode: ${qrCode}`
    );

    navigate("/home");

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    alert(err.response?.data?.message || "Register failed");
  }
};

  return (
    <div>
      <h2>REGISTER</h2>

      <form onSubmit={handleRegister}>
        <input
          placeholder="first name"
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        <input
          placeholder="last name"
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />

        <input
          placeholder="email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
  placeholder="phone"
  onChange={(e) =>
    setForm({ ...form, phone: e.target.value })
  }
/>

<input
  placeholder="ID Number"
  onChange={(e) =>
    setForm({ ...form, idNumber: e.target.value })
  }
/>

<input
  placeholder="Nationality"
  onChange={(e) =>
    setForm({ ...form, nationality: e.target.value })
  }
/>

<input
  placeholder="Address"
  onChange={(e) =>
    setForm({ ...form, address: e.target.value })
  }
/>

        <input
          type="password"
          placeholder="password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="confirm password"
          placeholder="confirm password"
          onChange={(e) =>
            setForm({ ...form, "confirm password": e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;