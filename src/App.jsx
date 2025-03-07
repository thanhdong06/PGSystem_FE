import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import ContactUs from "./pages/contactus/contactus";
import Membership from "./pages/membership/Membership";
import Login from "./pages/Login/Login";
import Layout from "./components/layout/Layout";
import Test from "./components/Test";
import CommentList from "./components/blog/CommentList";
import Blog from "./pages/blog/Blog";

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
      element: <ContactUs />,
    },
    {
      path: "/membership",
      element: <Membership />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/test",
      element: <Test/>,
    },
    {
      path:'/commentlist',
      element:<CommentList/>
    },
    {
      path: '/blog',
      element: <Blog/>,
    }
    
  
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );

}

export default App;
