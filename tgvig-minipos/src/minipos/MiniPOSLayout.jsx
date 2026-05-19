import { Navigate } from "react-router-dom";

function MiniPOSLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "STAFF") {
    return <Navigate to="/minipos/login" />;
  }

  return (
    <div>
      <h2>MINIPOS SYSTEM</h2>
      <p>Select function: Scan / Parking / Booking</p>
    </div>
  );
}

export default MiniPOSLayout;