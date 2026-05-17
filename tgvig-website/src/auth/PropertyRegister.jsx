import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function PropertyRegister() {

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

  // PARTNER DATA
  const [partner, setPartner] = useState({
    businessName: "",
    businessType: "",
    businessAddress: "",
  });

  // PROPERTY DATA
  const [property, setProperty] = useState({
    type: "",
    name: "",
    location: "",
    rooms: "",
    pricePerNight: "",
    amenities: "",
    images: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      // 1. CREATE MEMBER
      await API.post("/members/register", member);

      // 2. LOGIN
      const loginRes = await API.post(
        "/members/login",
        {
          email: member.email,
          password: member.password,
        }
      );

      const token = loginRes.data.token;

      // SAVE LOGIN
      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify(loginRes.data.user)
      );

      // 3. REGISTER PARTNER
      await API.post(
        "/partners/register",
        partner,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 4. REGISTER PROPERTY
      await API.post(
        "/properties/register",
        {
          ...property,
          amenities: property.amenities
            .split(",")
            .map((a) => a.trim()),

          images: property.images
            .split(",")
            .map((i) => i.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property registration successful");

      navigate("/partner");

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

      <h2>
        🏨 Property / Hotel / Parking Registration
      </h2>

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

        {/* PARTNER */}

        <h3>Business Info</h3>

        <input
          placeholder="Business Name"
          onChange={(e) =>
            setPartner({
              ...partner,
              businessName: e.target.value,
            })
          }
        />

        <input
          placeholder="Business Type"
          onChange={(e) =>
            setPartner({
              ...partner,
              businessType: e.target.value,
            })
          }
        />

        <input
          placeholder="Business Address"
          onChange={(e) =>
            setPartner({
              ...partner,
              businessAddress: e.target.value,
            })
          }
        />

        {/* PROPERTY */}

        <h3>Property Info</h3>

        <input
          placeholder="Property Type"
          onChange={(e) =>
            setProperty({
              ...property,
              type: e.target.value,
            })
          }
        />

        <input
          placeholder="Property Name"
          onChange={(e) =>
            setProperty({
              ...property,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Location"
          onChange={(e) =>
            setProperty({
              ...property,
              location: e.target.value,
            })
          }
        />

        <input
          placeholder="Rooms"
          onChange={(e) =>
            setProperty({
              ...property,
              rooms: e.target.value,
            })
          }
        />

        <input
          placeholder="Price Per Night"
          onChange={(e) =>
            setProperty({
              ...property,
              pricePerNight: e.target.value,
            })
          }
        />

        <input
          placeholder="Amenities comma separated"
          onChange={(e) =>
            setProperty({
              ...property,
              amenities: e.target.value,
            })
          }
        />

        <input
          placeholder="Image URLs comma separated"
          onChange={(e) =>
            setProperty({
              ...property,
              images: e.target.value,
            })
          }
        />

        <button type="submit">
          Register Property
        </button>

      </form>

    </div>
  );
}

export default PropertyRegister;