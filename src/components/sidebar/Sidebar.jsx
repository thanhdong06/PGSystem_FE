import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ searchInputRef, toggleDrawer }) => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Search Input */}
        <li>
          <label className="input w-64 flex items-center gap-x-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              ref={searchInputRef}
              type="search"
              className="grow"
              placeholder="Search"
            />
            <kbd className="kbd kbd-sm">Ctrl</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
        </li>

        {/* Sidebar Links */}
        <ul className="menu bg-base-200 rounded-box w-64 p-4">
          <div>
            <a className="text-lg font-semibold text-primary">
              🌟 Main Navigation
            </a>
          </div>

          {/* General Section - Always Open */}
          <li className="mt-2">
            <details open>
              <summary className="font-semibold cursor-pointer text-secondary">
                📌 General
              </summary>
              <ul className="ml-4 space-y-2">
                <li>
                  <Link to="/home" onClick={toggleDrawer}>
                    🏠 Home
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={toggleDrawer}>
                    📞 Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={toggleDrawer}>
                    🔑 Login
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Membership & Blog Section - Starts Closed */}
          <li className="mt-2">
            <details>
              <summary className="font-semibold cursor-pointer text-secondary">
                📚 Membership & Blog
              </summary>
              <ul className="ml-4 space-y-2">
                <li>
                  <Link to="/membership" onClick={toggleDrawer}>
                    🎟️ Membership
                  </Link>
                </li>
                <li>
                  <Link to="/blog" onClick={toggleDrawer}>
                    ✍️ Blog
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Tools Section - Starts Closed */}
          <li className="mt-2">
            <details>
              <summary className="font-semibold cursor-pointer text-secondary">
                🛠️Tools 
              </summary>
              <ul className="ml-4 space-y-2">
                <li>
                  <Link to="/duedatecalculation" onClick={toggleDrawer}>
                    📅 Due Date Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/ovulationcalculation" onClick={toggleDrawer}>
                    🏵️ Ovulation Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/pregnancydiagnosis" onClick={toggleDrawer}>
                    🩺 Pregnancy Diagnosis
                  </Link>
                </li>
                <li>
                  <Link to="/babynamefinder" onClick={toggleDrawer}>
                    👶 Baby Name Finder
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
