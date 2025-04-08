import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeSwitch from "../../components/themeswitch/ThemeSwitch";
import {
  Squares2X2Icon,
  UsersIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const iconClasses = `h-6 w-6`;

const routes = [
  {
    path: "/admin/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/admin/usermanagement",
    icon: <UsersIcon className={iconClasses} />,
    name: "User Management",
  },
  {
    path: "/admin/blogmanagement",
    icon: <DocumentTextIcon className={iconClasses} />,
    name: "Blog Management",
  },
  {
    path: "/admin/transactions",
    icon: <CurrencyDollarIcon className={iconClasses} />,
    name: "Transactions",
  },
  {
    path: "/admin/memberships",
    icon: <HomeIcon className={iconClasses} />,
    name: "Memberships",
  },
  // {
  //   path: "/admin/memberlist",
  //   icon: <HomeIcon className={iconClasses} />,
  //   name: "Memberships",
  // },

  {
    path: "/admin/SubscriptionCreator",
    icon:<UsersIcon className={iconClasses} />,
    name: "SubscriptionCreator",
  },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    // Clear authentication data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");

    // Display success toast message (matching Navbar styling)
    toast.success("Logged out successfully", {
      autoClose: 700,
      style: {
        backgroundColor: "#28a745",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
      },
    });

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen bg-gray-900 text-white p-5 flex flex-col justify-between ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-bold transition-all ${
              isOpen ? "block" : "hidden"
            }`}
          >
            Admin Panel
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            {isOpen ? "➖" : "➕"}
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-3">
          {routes.map((route, index) => (
            <li key={index}>
              <Link
                to={route.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  location.pathname === route.path
                    ? "bg-blue-500"
                    : "hover:bg-gray-700"
                }`}
              >
                {route.icon}
                {isOpen && <span>{route.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div>
        <div className="flex items-center justify-center h-[50px] bg-gray-800 rounded-lg mb-4 w-full">
          <ThemeSwitch />
        </div>
        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 p-3 bg-red-500 hover:bg-red-700 rounded-lg w-full"
        >
          <ArrowLeftOnRectangleIcon className={iconClasses} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
