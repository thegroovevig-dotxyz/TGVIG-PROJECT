import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// pages
import WebFront from "./pages/WebFront";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Promotions from "./pages/Promotions";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wallet from "./pages/Wallet";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import TableBooking from "./pages/TableBooking";
import Events from "./pages/Events";
import Benefits from "./pages/Benefits";
import Venues from "./pages/Venues";
import DriverLayout from "./driver/DriverLayout";
import PartnerLayout from "./partner/PartnerLayout";
// DRIVER
import DriverLayout from "./driver/DriverLayout";
import DriverHome from "./driver/pages/DriverHome";
import Rides from "./driver/pages/Rides";
// PARTNER
import PartnerLayout from "./partner/PartnerLayout";
import PartnerHome from "./partner/pages/PartnerHome";
import PartnerBookings from "./partner/pages/PartnerBookings";
import ParkingSessions from "./partner/pages/ParkingSessions";
import MiniPOS from "./partner/pages/MiniPOS";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<WebFront />} />
      <Route path="/benefits" element={<Benefits />} />
      <Route path="/venues" element={<Venues />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PRIVATE */}
      <Route
        path="/home/*"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* DRIVER */}
<Route
  path="/driver/*"
  element={
    <ProtectedRoute allowedRoles={["DRIVER"]}>
      <DriverLayout />
    </ProtectedRoute>
  }
/>

{/* PARTNER (Hotels / Parking / Lodges) */}
<Route
  path="/partner/*"
  element={
    <ProtectedRoute allowedRoles={["PARTNER"]}>
      <PartnerLayout />
    </ProtectedRoute>
  }
/>
         <Route index element={<Home />} />
         <Route path="home" element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="table-booking" element={<TableBooking />} />
        <Route path="events" element={<Events />} />
<Route path="/driver/*" element={<DriverLayout />} />
<Route path="/partner/*" element={<PartnerLayout />} />

      </Route>
{/* DRIVER */}
<Route path="/driver/*" element={<DriverLayout />}>
  <Route index element={<DriverHome />} />
  <Route path="rides" element={<Rides />} />
</Route>

{/* PARTNER */}
<Route path="/partner/*" element={<PartnerLayout />}>
  <Route index element={<PartnerHome />} />
  <Route path="bookings" element={<PartnerBookings />} />
  <Route path="parking" element={<ParkingSessions />} />
  <Route path="pos" element={<MiniPOS />} />
</Route>
    </Routes>
  );
}

export default App;