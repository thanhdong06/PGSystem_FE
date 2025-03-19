import React from "react";
import AdminSidebar from "../../pages/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar (Always Open) */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
