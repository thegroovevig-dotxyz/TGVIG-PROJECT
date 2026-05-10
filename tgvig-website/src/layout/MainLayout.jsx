import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="/home">
      <Navbar />

      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;