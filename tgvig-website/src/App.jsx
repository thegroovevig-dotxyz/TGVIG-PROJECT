import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// pages
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
import WebRewards from "./pages/WebRewards";
import WebFront from "./pages/WebFront";

function App() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED WEB APP */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
       
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="/table-booking" element={<TableBooking />} />
<Route path="/events" element={<Events />} />
 <Route path="benefits" element={<Benefits />} />
        <Route path="venues" element={<Venues />} />
        <Route path="/webRewards" element={<WebRewards />} />
        <Route path="/" element={<WebFront />} />
      </Route>
    </Routes>
  );
}

console.log("USER FROM STORAGE:", localStorage.getItem("user"));
console.log("TOKEN:", localStorage.getItem("token"));

export default App;