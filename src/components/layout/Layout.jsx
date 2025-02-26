import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="drawer">
      {/* Sidebar Toggle */}
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={toggleDrawer}
      />

      {/* Main Content */}
      <div className="drawer-content">
        <Navbar toggleDrawer={toggleDrawer} />
        <div className="p-4">{children}</div>
      </div>

      {/* Sidebar Component */}
      <Sidebar toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Layout;
