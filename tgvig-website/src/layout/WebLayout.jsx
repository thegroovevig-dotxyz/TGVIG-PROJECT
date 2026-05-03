import { Outlet } from "react-router-dom";
import WebNavbar from "./WebNavbar";

function WebLayout() {
  return (
    <>
      <WebNavbar />
      <Outlet />
    </>
  );
}

export default WebLayout;