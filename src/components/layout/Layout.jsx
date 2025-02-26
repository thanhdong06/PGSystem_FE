import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { use } from "react";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchInputRef = useRef(null);
  const closeSidebarwithESC = useRef(null);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };
  // Ctrl + K short cut for search  
  useEffect(() => {
    const handleShortcut = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();

        setDrawerOpen(true);

        setTimeout(() => {
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        }, 100);
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);
  // ESC close Sidebar
  useEffect(() => {
    closeSidebarwithESC.current = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", closeSidebarwithESC.current);
    return () => {
      document.removeEventListener("keydown", closeSidebarwithESC.current);
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
