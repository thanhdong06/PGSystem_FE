import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import ContactUs from "./pages/contactus/contactus";
import Membership from "./pages/membership/Membership";
import Login from "./pages/Login/Login";
import Layout from "./components/layout/Layout";
import Test from "./components/Test";
import Blog from "./pages/blog/Blog";

import ReminderList from "./pages/Reminder/Reminder";
import Profile from "./pages/Profile/Profile";
import DueDateCalculation from "./pages/tools/duedatecalculation/DueDateCalculation";
import OvulationCalculator from "./pages/tools/ovulationcalculation/OvulationCalculation";
import PregnancyDiagnosis from "./pages/tools/pregnancydiagnosis/PegnancyDiagnosis";
import BabyNamesFinder from "./pages/tools/babynamesfinder/BabyNamesFinder";
import PaymentSuccess from "./pages/payment/paymentsuccess";
import Transactions from "./pages/admin/transactions/Transactions";
import Dashboard from "./pages/admin/dashboard/DashBoard";
import UserManagement from "./pages/admin/usermanagement/UserManagement";
import BlogManagement from "./pages/admin/blogmanagement/BlogManagement";
import AdminLayout from "./components/layout/AdminLayout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/home",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/contact",

      element: (
        <Layout>
          <ContactUs />
        </Layout>
      ),
    },
    {
      path: "/membership",
      element: (
        <Layout>
          <Membership />
        </Layout>
      ),
    },
    {
      path: "/paymentsuccess",
      element: (
        <Layout>
          <PaymentSuccess />
        </Layout>
      ),
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/blog",
      element: (
        <Layout>
          <Blog />
        </Layout>
      ),
    },

    {
      path: "/blog",
      element: <Blog />,
    },
    {
      path: "/blog/:bid",
      element: (
        <Layout>
          <Blog />
        </Layout>
      ),
    },
    {
      path: "/reminder",
      element: <ReminderList />,
    },

    {
      path: "/Profile",
      element: <Profile />,
    },

    {
      path: "/duedatecalculation",
      element: (
        <Layout>
          <DueDateCalculation />
        </Layout>
      ),
    },
    {
      path: "/ovulationcalculation",
      element: (
        <Layout>
          <OvulationCalculator />
        </Layout>
      ),
    },
    {
      path: "/pregnancydiagnosis",
      element: (
        <Layout>
          <PregnancyDiagnosis />
        </Layout>
      ),
    },
    {
      path: "/babynamefinder",
      element: (
        <Layout>
          <BabyNamesFinder />
        </Layout>
      ),
    },
    //admin part
    { 
      path: "/admin",
      element: <AdminLayout />, // New Admin Layout with Sidebar
      children: [
        { index: true, element: <Navigate to="/admin/dashboard" replace /> }, // 🔹 Redirect `/admin` to `/admin/dashboard`
        { path: "dashboard", element: <Dashboard /> },
        { path: "usermanagement", element: <UserManagement /> },
        { path: "blogmanagement", element: <BlogManagement /> },
        { path: "transactions", element: <Transactions /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
