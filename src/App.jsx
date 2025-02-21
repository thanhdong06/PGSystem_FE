import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import ContactUs from "./pages/contactus/contactus"
import Membership from "./pages/membership/Membership";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/contact",
      element: <ContactUs/>,
    },
    {
      path: "/membership",
      element: <Membership />,
    }
    ]);
  return <RouterProvider router={router} />;
}

export default App
