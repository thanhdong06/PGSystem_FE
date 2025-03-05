import React, { useState, useEffect } from "react";
import ThemeSwitch from "../themeswitch/ThemeSwitch";
import { Link } from "react-router-dom";

const Navbar = ({ toggleDrawer }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalLogOut, setIsModalLogOut] = useState(false);
  const notifications = 3;

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  // Get user from local storage
  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    if (storeUser) {
      setUser(JSON.parse(storeUser));
    }
  }, []); // Only run once when the component mounts

  // // Handle logout
  // const handleLogOut = async () => {
  //   setIsModalLogOut(false);
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   setUser(null);
  //   toast.success("Logged out successfully");

  //   navigate("/?status=logout_success");
  // };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M3 6h18M3 12h12M3 18h6" />
              <circle cx="17" cy="17" r="3" />
              <path d="M20.5 20.5L19 19" />
            </svg>
          </a>
          <div className="w-[50px]">
            <ThemeSwitch />
          </div>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-4">
          {/* Notifications */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 relative flex items-center gap-2 bg-transparent border-none shadow-none hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-700"
              >
                <path d="M12 2C8.7 2 6 4.7 6 8v5c0 .5-.3 1.1-.7 1.4L4 16c-.6.6-.2 1.6.7 1.6h4.3c.1 1.7 1.5 3 3.2 3s3.1-1.3 3.2-3h4.3c.9 0 1.3-1 .7-1.6l-1.3-1.6c-.4-.3-.7-.9-.7-1.4V8c0-3.3-2.7-6-6-6zm0 18c-.8 0-1.5-.7-1.5-1.5h3c0 .8-.7 1.5-1.5 1.5z" />
              </svg>
              {notifications > 0 && (
                <span className="badge badge-error absolute top-0 right-0 transform translate-x-1 -translate-y-1 text-white text-xs">
                  {notifications}
                </span>
              )}
            </div>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
              <li>
                <a>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur, nulla!
                </a>
              </li>
              <li>
                <a>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptate, et.
                </a>
              </li>
            </ul>
          </div>

          {/* User Authentication: Login/Register OR Avatar */}
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2 place-content-stretch items-center">
              <Link
                to="/login"
                className="link link-primary"
                onClick={handleLogin}
              >
                Log in
              </Link>
              <div className="divider divider-horizontal"></div>
              <Link to="/register" className="link link-primary">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
