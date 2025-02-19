import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import ContactUs from "./pages/contactus/contactus"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/contact",
      element: <ContactUs />,
    },
    ]);
  return <RouterProvider router={router} />;
}

export default App
