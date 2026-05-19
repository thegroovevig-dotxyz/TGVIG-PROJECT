import { Routes, Route } from "react-router-dom";

import MiniPOSLayout from "./minipos/MiniPOSLayout";
import ScanQR from "./minipos/ScanQR";
import ParkingCheckin from "./minipos/ParkingCheckin";
import BookingApproval from "./minipos/BookingApproval";
import StaffLogin from "./minipos/StaffLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MiniPOSLayout />} />

      <Route path="/minipos/scan-qr" element={<ScanQR />} />
      <Route path="/minipos/parking-checkin" element={<ParkingCheckin />} />
      <Route path="/minipos/booking-approval" element={<BookingApproval />} />
      <Route path="/minipos/login" element={<StaffLogin />} />
    </Routes>
  );
}

export default App;