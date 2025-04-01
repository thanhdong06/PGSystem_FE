import React, { useState, useEffect } from "react";
import ThemeSwitch from "../themeswitch/ThemeSwitch";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../sidebar/Sidebar"; // Make sure the path matches your project structure

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const notifications = 3;

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // On mount, check local storage for authentication data
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLoggedIn(false);
    toast.success("Logged out successfully", {
      autoClose: 700,
      style: {
        backgroundColor: "#28a745",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
      },
    });
  };

  return (
    <>
      {/* Include Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Navbar */}
      <div className="navbar bg-base-100 shadow-md py-2">
        <div className="navbar-start flex items-center">
          {/* Colorful Sidebar Toggle Button */}
          <button 
            onClick={toggleSidebar} 
            className="relative group btn btn-ghost btn-circle bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
            aria-label="Toggle sidebar menu"
          >
            <div className="flex flex-col gap-1.5 items-center justify-center w-6 h-6 transform transition-all duration-300 ease-in-out">
              <span className="block h-1 w-6 bg-primary rounded-full transition-all duration-300 ease-in-out group-hover:bg-primary-focus"></span>
              <span className="block h-1 w-5 bg-secondary rounded-full transition-all duration-300 ease-in-out group-hover:w-6 group-hover:bg-secondary-focus"></span>
              <span className="block h-1 w-4 bg-accent rounded-full transition-all duration-300 ease-in-out group-hover:w-6 group-hover:bg-accent-focus"></span>
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
          </button>

          {/* Logo/Brand */}
          <Link to="/home" className="btn btn-ghost text-xl font-bold px-2 ml-1">
            <span className="text-primary">Pregnancy Growth </span>
          </Link>
          
          {/* Theme Switch */}
          <div className="ml-2">
            <ThemeSwitch />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-1">
            <li>
              <Link to="/home" className="rounded-lg font-medium">Home</Link>
            </li>
            <li>
              <Link to="/blog" className="rounded-lg font-medium">Blog</Link>
            </li>
            <li>
              <details>
                <summary className="rounded-lg font-medium">Tools</summary>
                <ul className="p-2 bg-base-100 rounded-lg shadow-lg z-10">
                  <li><Link to="/duedatecalculation">Due Date Calculator</Link></li>
                  <li><Link to="/ovulationcalculation">Ovulation Calculator</Link></li>
                  <li><Link to="/pregnancydiagnosis">Pregnancy Diagnosis</Link></li>
                  <li><Link to="/babynamefinder">Baby Name Finder</Link></li>
                </ul>
              </details>
            </li>
            {isLoggedIn && user && user.role?.toLowerCase() === "member" && (
              <li>
                <Link to="/member" className="rounded-lg font-medium">Member Area</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          {/* Notifications */}
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {notifications > 0 && (
                <span className="badge badge-sm badge-error absolute -top-1 -right-1 text-white">
                  {notifications}
                </span>
              )}
            </button>
            <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72 mt-3">
              <div className="p-2 border-b border-base-300">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-base-200 rounded-lg mt-1">
                  <p className="text-sm">New blog post: "Preparing for your baby's arrival"</p>
                  <p className="text-xs text-base-content/70 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 hover:bg-base-200 rounded-lg mt-1">
                  <p className="text-sm">Your due date calculation is ready!</p>
                  <p className="text-xs text-base-content/70 mt-1">Yesterday</p>
                </div>
                <div className="p-3 hover:bg-base-200 rounded-lg mt-1">
                  <p className="text-sm">Weekly pregnancy update: Week 24</p>
                  <p className="text-xs text-base-content/70 mt-1">3 days ago</p>
                </div>
              </div>
              <div className="p-2 border-t border-base-300 mt-1">
                <Link to="/notifications" className="btn btn-ghost btn-sm w-full justify-center">
                  View all
                </Link>
              </div>
            </div>
          </div>

          {/* User Authentication */}
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul className="dropdown-content menu menu-sm bg-base-100 rounded-box shadow-lg z-10 mt-3 w-60 p-2">
                <li className="mb-1">
                  <div className="flex flex-col items-start p-3">
                    <span className="font-medium">{user?.name || "User"}</span>
                    <span className="text-xs opacity-60">{user?.email || "user@example.com"}</span>
                  </div>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    Settings
                  </Link>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-error flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to="/login"
                className="btn btn-sm btn-outline btn-primary rounded-full mr-2"
              >
                Log in
              </Link>
              <Link
                to="/login"
                className="btn btn-sm btn-primary rounded-full"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;