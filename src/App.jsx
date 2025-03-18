import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import ContactUs from "./pages/contactus/contactus";
import Membership from "./pages/membership/Membership";
import Login from "./pages/Login/Login";
import Layout from "./components/layout/Layout";
import Test from "./components/Test";
import Blog from "./pages/blog/Blog";

import ReminderList from "./pages/Reminder/CalendarView";
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
      path: "/membership",
      element: (
        <Layout>
          <Membership />
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

      path: '/blog',
      element: <Blog/>,
    },
    {
      path: "/reminder",
      element: <ReminderList/>,
    },

    {
      path:'/Profile',
      element:<Profile/>,
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
