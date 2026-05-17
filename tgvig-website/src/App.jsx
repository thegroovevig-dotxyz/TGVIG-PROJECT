import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// public
import WebFront from "./pages/WebFront";
import Benefits from "./pages/Benefits";
import Venues from "./pages/Venues";

// member pages
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

import Parking from "./pages/Parking";
import Properties from "./pages/Properties";
// driver
import DriverLayout from "./driver/DriverLayout";
import DriverHome from "./driver/pages/DriverHome";
import Rides from "./driver/pages/Rides";

// partner
import PartnerLayout from "./partner/PartnerLayout";
import PartnerHome from "./partner/pages/PartnerHome";
import PartnerBookings from "./partner/pages/PartnerBookings";
import ParkingSessions from "./partner/pages/ParkingSessions";
import MiniPOS from "./partner/pages/MiniPOS";
import DriverLogin from "./auth/DriverLogin";
import PropertyLogin from "./auth/PropertyLogin";
import DriverRegister from "./auth/DriverRegister";
import PropertyRegister from "./auth/PropertyRegister";

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

      {/* MEMBER SYSTEM */}
      <Route
        path="/home/*"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
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
<Route path="parking" element={<Parking />} />
<Route path="properties" element={<Properties />} />
      </Route>

      {/* DRIVER SYSTEM */}
      <Route path="/driver/*" element={<DriverLayout />}>
        <Route index element={<DriverHome />} />
        <Route path="rides" element={<Rides />} />

      </Route>

      {/* PARTNER SYSTEM */}
      <Route path="/partner/*" element={<PartnerLayout />}>
        <Route index element={<PartnerHome />} />
        <Route path="bookings" element={<PartnerBookings />} />
        <Route path="parking" element={<ParkingSessions />} />
        <Route path="pos" element={<MiniPOS />} />
      </Route>

      {/* AUTH */}
<Route path="/login" element={<Login />} />
<Route path="/login/driver" element={<DriverLogin />} />
<Route path="/login/property" element={<PropertyLogin />} />
<Route path="/register" element={<Register />} />
<Route
  path="/register/driver"
  element={<DriverRegister />}
/>
<Route
  path="/register/property"
  element={<PropertyRegister />}
/>

    </Routes>
  );
}

export default App;