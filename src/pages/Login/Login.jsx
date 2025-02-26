import React, { useState } from "react";
import Footer from "../../components/footer/Footer";

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log("Đăng nhập submit");
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log("Đăng ký submit");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-gray-300">
        <div className="bg-white rounded-lg shadow-lg w-96 p-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">
            {rightPanelActive ? "Create Account" : "Sign In"}
          </h1>
          <form onSubmit={rightPanelActive ? handleSignUpSubmit : handleSignInSubmit} className="w-full">
            {rightPanelActive && (
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {!rightPanelActive && (
              <a href="#" className="text-sm text-gray-600 hover:underline">Forgot your password?</a>
            )}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              {rightPanelActive ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => setRightPanelActive(!rightPanelActive)}>
            {rightPanelActive ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
