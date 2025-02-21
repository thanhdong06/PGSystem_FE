import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import ContactUs from "./pages/contactus/contactus"
import Subscriptions from "./pages/subscriptions/Subscriptions"
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
      element: <ContactUs />,
    },
    {
      path: "/subscriptions",
      element: <Subscriptions />,
    }
    ]);
  return <RouterProvider router={router} />;
}

export default App
