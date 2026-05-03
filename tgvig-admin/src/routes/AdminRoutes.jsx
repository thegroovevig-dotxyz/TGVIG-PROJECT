import { Route, Routes } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import Clubs from "../pages/Clubs";
import MenuManagement from "../pages/MenuManagement";
import Promotions from "../pages/Promotions";
import Blogs from "../pages/Blogs";
import Transactions from "../pages/Transactions";
import Analytics from "../pages/Analytics";
import StaffManagement from "../pages/StaffManagement";
import TableBooking from "../pages/TableBooking";
import Events from "../pages/Events";
import CardDesigner from "../pages/CardDesigner";
import DeviceManager from "../pages/DeviceManager";
import DeviceBlogs from "../pages/DeviceBlogs";
import Coupons from "../pages/Coupons";
import Notifications from "../pages/Notifications";
import WebFront from "../pages/WebFront";



function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route index element={<Dashboard />} />

        <Route path="members" element={<Members />} />
        <Route path="clubs" element={<Clubs />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="table-bookings" element={<TableBooking />} />
<Route path="events" element={<Events />} />
<Route path="/card-designer" element={<CardDesigner />} />
<Route path="/devices" element={<DeviceManager />} />
        <Route path="/device-blogs" element={<DeviceBlogs />} />
        <Route path="coupons" element={<Coupons />} />
<Route path="notifications" element={<Notifications />} />
<Route path="webfront" element={<WebFront />} />

      </Route>
    </Routes>
  );
}

export default AdminRoutes;