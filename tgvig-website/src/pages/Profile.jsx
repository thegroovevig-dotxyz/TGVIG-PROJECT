import { useEffect, useState } from "react";
import { authService } from "../auth/authService";
import { getMember } from "../api/member.api";
import { QRCodeCanvas } from "qrcode.react";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = authService.getUser();
    const id = user?._id || user?.id;

    if (!id) return;

    getMember(id)
      .then((res) => setProfile(res.data))
      .catch(console.log);
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>PROFILE</h2>

      <p><b>Name:</b> {profile.firstName} {profile.lastName}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Membership No:</b> {profile.membershipNo}</p>
      <p><b>Role:</b> {profile.role}</p>
      <p><b>Status:</b> {profile.status}</p>
      <p><b>Tier:</b> {profile.tier}</p>
      <p><b>Wallet:</b> R {profile.walletBalance}</p>
      <p><b>Points:</b> {profile.pointsBalance}</p>

      {/* QR CODE UI ONLY */}
      <div style={{ marginTop: "25px", textAlign: "center" }}>
        <h3>Member QR</h3>

        <div style={{
          display: "inline-block",
          padding: "10px",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "10px"
        }}>
          <QRCodeCanvas value={profile._id} size={160} />
        </div>

        <p style={{ marginTop: "10px", fontSize: "12px" }}>
          Show this at entry
        </p>
      </div>
    </div>
  );
}

export default Profile;