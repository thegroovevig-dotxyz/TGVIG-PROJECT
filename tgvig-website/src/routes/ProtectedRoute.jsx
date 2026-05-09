import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";


import WebLayout from "../layout/WebLayout";
import MainLayout from "../layout/MainLayout";

import WebFront from "../pages/WebFront";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../pages/Home";




function App() {
  return (

      <Routes>

        {/* 🌐 PUBLIC WEBSITE */}
        <Route element={<WebLayout />}>
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
          <Route path="home" element={<Home />} />
        </Route>

      </Routes>
   
  );
}

export default App;