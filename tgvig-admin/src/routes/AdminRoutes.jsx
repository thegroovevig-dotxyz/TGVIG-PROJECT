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
import TaxiPage from "./pages/taxi/TaxiPage";
import DriversPage from "./pages/taxi/DriversPage";
import RidesPage from "./pages/taxi/RidesPage";
import PropertiesPage from "./pages/accommodation/PropertiesPage";
import BookingsPage from "./pages/accommodation/BookingsPage";
import PartnersPage from "./pages/accommodation/PartnersPage";
import ParkingPage from "./pages/parking/ParkingPage";
import ParkingSessionsPage from "./pages/parking/ParkingSessionsPage";
import PayoutsPage from "./pages/finance/PayoutsPage";
import DriverApprovalsPage from "./pages/admin/DriverApprovalsPage";
import PropertyApprovalsPage from "./pages/admin/PropertyApprovalsPage";
import PartnerApprovalsPage from "./pages/admin/PartnerApprovalsPage";



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
 <Route path="taxi" element={<TaxiPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="rides" element={<RidesPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="partners" element={<PartnersPage />} />
           <Route path="parking" element={<ParkingPage />} />
          <Route path="parking-sessions" element={<ParkingSessionsPage />} />
           <Route path="payouts" element={<PayoutsPage />} />
           <Route
  path="admin/drivers"
  element={<DriverApprovalsPage />}
/>

<Route
  path="admin/properties"
  element={<PropertyApprovalsPage />}
/>

<Route
  path="admin/partners"
  element={<PartnerApprovalsPage />}
/>

      </Route>
    </Routes>
  );
}

export default AdminRoutes;