import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MemberLayout from "./components/layout/MemberLayout";
import Membership from "./pages/membership/Membership";
import CalendarView from "./pages/Reminder/CalendarView";
import FatalGrowthTracker from "./pages/Fetal Growth Tracker/FetalGrowthracker";
import Home from "./pages/home/Home";
import ContactUs from "./pages/contactus/contactus";
import Login from "./pages/Login/Login";
import Test from "./components/Test";
import Blog from "./pages/blog/Blog";
import Profile from "./pages/Profile/Profile";
import DueDateCalculation from "./pages/tools/duedatecalculation/DueDateCalculation";
import OvulationCalculator from "./pages/tools/ovulationcalculation/OvulationCalculation";
import PregnancyDiagnosis from "./pages/tools/pregnancydiagnosis/PegnancyDiagnosis";
import BabyNamesFinder from "./pages/tools/babynamesfinder/BabyNamesFinder";
import PaymentSuccess from "./pages/payment/paymentsuccess";
import PaymentCancel from "./pages/payment/PaymentCancel";
import Transactions from "./pages/admin/transactions/Transactions";
import Dashboard from "./pages/admin/dashboard/DashBoard";
import UserManagement from "./pages/admin/usermanagement/UserManagement";
import BlogManagement from "./pages/admin/blogmanagement/BlogManagement";
import AdminLayout from "./components/layout/AdminLayout";

// Import ToastContainer và CSS của react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MembershipManagement from "./pages/admin/Memberships/Memberships";


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
      path: "/member",
      element: <MemberLayout />,
      children: [
        { index: true, element: <Navigate to="/member/reminder" replace /> },
        { path: "reminder", element: <CalendarView /> },
        { path: "fetalgrowthtracker", element: <FatalGrowthTracker /> },
      ],
    },
    {
      path: "/payment-successfully",
      element: (
        <Layout>
          <PaymentSuccess />
        </Layout>
      ),
    },
    {
      path: "/payment-cancel",
      element: (
        <Layout>
          <PaymentCancel />
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
      path: "/membership",
      element: <Membership />,
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
      element: <AdminLayout />,
      children: [
        { index: true, element: <Navigate to="/admin/dashboard" replace /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "usermanagement", element: <UserManagement /> },
        { path: "blogmanagement", element: <BlogManagement /> },
        { path: "transactions", element: <Transactions /> },
        { path: "memberships", element: <MembershipManagement /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
     
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
