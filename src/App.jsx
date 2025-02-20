import Footer from "./components/footer/Footer";
import { ToastContainer, Slide } from "react-toastify";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home, Login, Header } from "./components";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      <ToastContainer
        transition={Slide}
        autoClose={2000}
        newestOnTop={true}
        pauseOnHover={true}
        pauseOnFocusLoss={false}
        limit={5}
      />
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {!isLoginPage && <Footer/>} 
    </div>
  );
}

export default App;
