import React, { useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // 

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    toast.success("Đăng nhập submit", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#28a745",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
      },
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    toast.success("Đăng ký submit", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#28a745",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
      },
    });
  };

  return (
    <>
      <div className="login-container animate-gradient flex justify-center items-center min-h-screen">
        <div className="login-box bg-white rounded-lg shadow-lg w-80 p-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">
            {rightPanelActive ? "Create Account" : "Sign In"}
          </h1>
          <form
            onSubmit={rightPanelActive ? handleSignUpSubmit : handleSignInSubmit}
            className="w-full"
          >
            {rightPanelActive && (
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!rightPanelActive && (
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Forgot your password?
              </a>
            )}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              {rightPanelActive ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p
            className="mt-4 text-sm text-gray-600 cursor-pointer hover:underline"
            onClick={() => setRightPanelActive(!rightPanelActive)}
          >
            {rightPanelActive
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
