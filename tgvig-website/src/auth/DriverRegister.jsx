import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function DriverRegister() {

  const navigate = useNavigate();

  // MEMBER DATA
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    idNumber: "",
    nationality: "",
    address: "",
  });

  // DRIVER DATA
  const [driver, setDriver] = useState({
    licenseNumber: "",
    licenseExpiry: "",
    vehicle: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      // 1. CREATE MEMBER
      await API.post("/members/register", member);

      // 2. LOGIN
      const loginRes = await API.post("/members/login", {
        email: member.email,
        password: member.password,
      });

      // SAVE AUTH
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(loginRes.data.user)
      );

      // 3. CREATE DRIVER PROFILE
      await API.post("/drivers/register", driver, {
        headers: {
          Authorization: `Bearer ${loginRes.data.token}`,
        },
      });

      alert("Driver registration successful");

      navigate("/driver");

    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div>

      <h2>🚗 Driver Registration</h2>

      <form onSubmit={handleRegister}>

        {/* MEMBER */}

        <input
          placeholder="First Name"
          onChange={(e) =>
            setMember({
              ...member,
              firstName: e.target.value,
            })
          }
        />

        <input
          placeholder="Last Name"
          onChange={(e) =>
            setMember({
              ...member,
              lastName: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setMember({
              ...member,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setMember({
              ...member,
              password: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          onChange={(e) =>
            setMember({
              ...member,
              phone: e.target.value,
            })
          }
        />

        <input
          placeholder="ID Number"
          onChange={(e) =>
            setMember({
              ...member,
              idNumber: e.target.value,
            })
          }
        />

        <input
          placeholder="Nationality"
          onChange={(e) =>
            setMember({
              ...member,
              nationality: e.target.value,
            })
          }
        />

        <input
          placeholder="Address"
          onChange={(e) =>
            setMember({
              ...member,
              address: e.target.value,
            })
          }
        />

        {/* DRIVER */}

        <input
          placeholder="License Number"
          onChange={(e) =>
            setDriver({
              ...driver,
              licenseNumber: e.target.value,
            })
          }
        />

        <input
          type="date"
          onChange={(e) =>
            setDriver({
              ...driver,
              licenseExpiry: e.target.value,
            })
          }
        />

        <input
          placeholder="Vehicle"
          onChange={(e) =>
            setDriver({
              ...driver,
              vehicle: e.target.value,
            })
          }
        />

        <button type="submit">
          Register Driver
        </button>

      </form>

    </div>
  );
}

export default DriverRegister;