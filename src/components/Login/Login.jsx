import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);


  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Thực hiện xử lý đăng nhập tại đây (ví dụ: gọi API)
    console.log("Đăng nhập submit");
  };

  // Hàm xử lý khi người dùng submit form đăng ký
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Thực hiện xử lý đăng ký tại đây (ví dụ: gọi API)
    console.log("Đăng ký submit");
  };

  return (
    <div className="login-page">
      <div
        id="container"
        className={`container ${rightPanelActive ? "right-panel-active" : ""}`}
      >
        {/* Form Đăng Ký (Sign Up) */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Form Đăng Nhập (Sign In) */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInSubmit}>
            <h1>Sign In</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                onClick={() => setRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>
                Enter your personal details and start journey with us
              </p>
              <button
                className="ghost"
                onClick={() => setRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
