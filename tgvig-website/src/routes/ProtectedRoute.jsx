import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebLayout from "../layout/WebLayout";
import MainLayout from "../layout/MainLayout";

import WebFront from "../pages/WebFront";
import Benefits from "../pages/Benefits";
import Venues from "../pages/Venues";
import WebRewards from "../pages/WebRewards";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../pages/Home";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 PUBLIC WEBSITE */}
        <Route element={<WebLayout />}>
        <Route path="benefits" element={<Benefits />} />
                <Route path="venues" element={<Venues />} />
                <Route path="webrewards" element={<WebRewards />} />
          <Route path="/" element={<WebFront />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 🔒 PRIVATE APP */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;