
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import ContactUs from "./pages/contactus/contactus"
import Membership from "./pages/membership/Membership";
import Login from "./pages/Login/Login";
import Layout from "./components/layout/Layout";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><Home/></Layout>,
    },
    {
      path: "/home",
      element:<Layout><Home/></Layout>,
    },
    {
      path: "/contact",
      element: <ContactUs/>,
    },
    {
      path: "/membership",
      element: <Membership />,
    },
    
    {
      path: "/login",
      element: <Login/>,
    },
    
   
   
    ]);
  return <RouterProvider router={router} />;

}

export default App;
