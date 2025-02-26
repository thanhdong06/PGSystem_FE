import React from "react";

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
        <li className="flex flex-col gap-2 mt-4">
          <a onClick={toggleDrawer}>Sidebar Item 2</a>
          <a onClick={toggleDrawer}>Sidebar Item 3</a>
          <a onClick={toggleDrawer}>Sidebar Item 4</a>
          <a onClick={toggleDrawer}>Sidebar Item 5</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
