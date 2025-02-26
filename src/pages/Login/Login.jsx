import React, { useState } from "react";
import { toast } from 'react-toastify';
import Footer from "../../components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";



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
      progress: undefined,
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
      progress: undefined,
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
      
      <style>{`
        .animate-gradient {
          background: linear-gradient(-45deg,rgb(32, 188, 32),rgb(228, 109, 109),rgb(67, 206, 241),rgb(164, 157, 157));
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }ư
        }
      `}</style>
      
      <div className="flex justify-center items-center min-h-screen animate-gradient">
        <div className="bg-white rounded-lg shadow-lg w-80 p-8 flex flex-col items-center">
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
                className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-"
            />
            <input
            
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-"
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
