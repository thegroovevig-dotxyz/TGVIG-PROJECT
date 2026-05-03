import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

function AdminLayout() {
  console.log("ADMIN LAYOUT RENDERED");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;