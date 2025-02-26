import React from "react";

const Sidebar = ({ toggleDrawer }) => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Sidebar content here */}
        <li>
          <a onClick={toggleDrawer}>
            <label className="input w-64">
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
              <input type="search" className="grow" placeholder="Search" />
              <kbd className="kbd kbd-sm">Ctrl</kbd>
              <kbd className="kbd kbd-sm">K</kbd>
            </label>
          </a>
        </li>
        <li>
          <a onClick={toggleDrawer}>Sidebar Item 2</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
