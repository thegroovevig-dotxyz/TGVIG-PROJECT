import { Routes, Route, Navigate } from "react-router-dom";

import SelfPOSLayout from "./layout/SelfPOSLayout";
import Login from "./auth/Login";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import POS from "./pages/POS";
import MenuGrid from "./pages/MenuGrid";

function App() {
  return (
    <Routes>
      {/* DEFAULT → LOGIN */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />

      {/* APP */}
      <Route path="/" element={<SelfPOSLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="selfpos" element={<MenuGrid />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pos" element={<POS />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
        <Route path="success" element={<OrderSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;