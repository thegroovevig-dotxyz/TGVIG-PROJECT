import { Routes, Route } from "react-router-dom";

import PosLayout from "./layout/PosLayout";
import POSDashboard from "./pages/POSDashboard";
import Checkout from "./pages/Checkout";
import MemberSearch from "./pages/MemberSearch";
import Cart from "./pages/Cart";
import Login from "./auth/Login";
import StartSale from "./pages/StartSale";
import RegisterMember from "./pages/RegisterMember";
import WalletTopUp from "./pages/WalletTopUp";
import POSRide from "./pos/POSRide";
import POSParking from "./pos/POSParking";
import POSBooking from "./pos/POSBooking";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <PosLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/pos" element={<POSDashboard />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="member" element={<MemberSearch />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/start-sale" element={<StartSale />} />
        <Route path="/start-sale/:clubId/:deviceId" element={<StartSale />} />
        <Route path="/register-member" element={<RegisterMember />} />
        <Route path="/wallet-topup" element={<WalletTopUp />} />
        <Route path="/pos/rides" element={<POSRide />} />
<Route path="/pos/parking" element={<POSParking />} />
<Route path="/pos/bookings" element={<POSBooking />} />
      </Route>

    </Routes>
  );
}

export default App;