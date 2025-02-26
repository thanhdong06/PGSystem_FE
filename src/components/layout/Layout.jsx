import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchInputRef = useRef(null);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  // ✅ Auto-focus search when sidebar opens via `Ctrl + K`
  useEffect(() => {
    const handleShortcut = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setDrawerOpen(true);
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  // ✅ Ensure the search input focuses **after** sidebar opens fully
  useEffect(() => {
    if (drawerOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 250); // Increased delay to allow sidebar to fully open
    }
  }, [drawerOpen]);

  // ✅ Close sidebar with ESC
  useEffect(() => {
    const closeSidebarwithESC = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", closeSidebarwithESC);
    return () => {
      document.removeEventListener("keydown", closeSidebarwithESC);
    };
  }, []);

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
        <div className="">{children}</div>
      </div>

      {/* Sidebar Component */}
      <Sidebar toggleDrawer={toggleDrawer} searchInputRef={searchInputRef} />
    </div>
  );
};

export default Layout;
