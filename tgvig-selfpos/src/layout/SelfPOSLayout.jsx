import { Outlet } from "react-router-dom";
import Header from "./Header";

function SelfPOSLayout() {
  return (
    <div>
      <Header />

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default SelfPOSLayout;