import { Routes, Route } from "react-router-dom";

import SelfPOSLayout from "./layout/SelfPOSLayout";

// auth
import Login from "./auth/Login";

// pages
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
      {/* AUTH */}
      <Route path="/login" element={<Login />} />

      {/* APP */}
      <Route path="/" element={<SelfPOSLayout />}>
        <Route index element={<Home />} />
        <Route path="selfpos/:clubId/:deviceId" element={<MenuGrid />} />
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