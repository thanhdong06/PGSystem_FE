import React from "react";
import MemberSidebar from "../../pages/Members/MemberSidebar";
import { Outlet } from "react-router-dom";

const MemberLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar (Always Open) */}
      <MemberSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
