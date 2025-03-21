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
        // { path: "home", element: <Membership /> }, // Nếu cần hiển thị trang thành viên thì bỏ comment
        { path: "reminder", element: <CalendarView /> },
        { path: "fetalgrowthtracker", element: <FatalGrowthTracker /> },
      ],
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
      element: <Membership/>,
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
  ]);
 

  return <RouterProvider router={router} />;
}

export default App;
