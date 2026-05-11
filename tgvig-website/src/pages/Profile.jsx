import { useEffect, useState } from "react";
import { authService } from "../auth/authService";
import { getMember } from "../api/member.api";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
  const user = authService.getUser();

  if (!user || !user._id) {
    console.log("No user or missing _id");
    return;
  }

  getMember(user._id)
    .then((res) => {
      console.log("PROFILE RESPONSE:", res.data);
      setProfile(res.data);
    })
    .catch((err) => {
      console.log("PROFILE ERROR:", err.response?.data || err.message);
    });
}, []);


  return (
  <div style={{ padding: "20px" }}>
    <h2>PROFILE</h2>

    <p><b>Name:</b> {profile?.firstName} {profile?.lastName}</p>
    <p><b>Email:</b> {profile?.email}</p>
    <p><b>Membership No:</b> {profile?.membershipNo}</p>
    <p><b>Role:</b> {profile?.role}</p>
    <p><b>Status:</b> {profile?.status}</p>
    <p><b>Tier:</b> {profile?.tier}</p>
    <p><b>Wallet:</b> R {profile?.walletBalance}</p>
    <p><b>Points:</b> {profile?.pointsBalance}</p>
  </div>
);
}

export default Profile;