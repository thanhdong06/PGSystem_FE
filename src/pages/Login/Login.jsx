import React, { useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(true);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Hàm xử lý Sign In
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Authentication/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Full response data:", data);

      if (data.value && data.value.data && data.value.data.token) {
        const { token, refreshToken, user } = data.value.data;
        console.log("Response token:", token);

        toast.success("Login success", {
          position: "top-right",
          autoClose: 2000,
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

        localStorage.setItem("Token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("phone", user.phone);
      
        localStorage.setItem("role", user.role);

        console.log("Saved token from localStorage:", localStorage.getItem("Token"));

        // window.location.href = "/"; // Điều hướng sau khi đăng nhập nếu cần
      } else {
        throw new Error(data.value?.message || "Invalid email or password");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#dc3545",
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
        },
      });
    }
  };

  // Hàm xử lý Sign Up (gọi API Register)
 // Hàm xử lý Sign Up (gọi API Register)
const handleSignUpSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(
      "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Authentication/Register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
     
        body: JSON.stringify({ email, password, phone, FullName: fullName }),
      }
    );

    if (!response.ok) {
      throw new Error("Register failed");
    }

    const result = await response.text();
    console.log("Register response:", result);

    toast.success("Register success", {
      position: "top-right",
      autoClose: 1500,
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

    // Reset input và chuyển sang trang Login sau khi đăng ký thành công
    setEmail("");
    setFullName("");
    setPhone("");
    setPassword("");
    setRightPanelActive(false);
  } catch (error) {
    toast.error(error.message || "An error occurred", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#dc3545",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
      },
    });
  }
};


  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#c7ecee] via-[#82ccdd] to-[#079992]">
        <div className="relative w-[350px] h-[500px] shadow-xl overflow-hidden rounded-xl">
          {/* Form Sign Up */}
          <div
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ${
              rightPanelActive ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <form onSubmit={handleSignUpSubmit} className="flex flex-col items-center justify-center h-full bg-white">
              <label
                onClick={() => setRightPanelActive(true)}
                className="text-3xl font-bold text-[#78e08f] cursor-pointer mb-6"
              >
                Sign Up
              </label>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-4/5 py-2 px-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-4/5 py-2 px-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />


              <input
                type="tel"
                placeholder="Phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-4/5 py-2 px-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-4/5 py-2 px-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-4/5 py-2 mt-2 text-white font-bold bg-[#573b8a] rounded-md hover:bg-[#6d44b8] transition"
              >
                Sign Up
              </button>
              <p
                onClick={() => setRightPanelActive(false)}
                className="mt-4 text-sm text-gray-600 cursor-pointer hover:underline"
              >
                Already have an account? Sign In
              </p>
            </form>
          </div>

          {/* Form Login */}
          <div
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ${
              rightPanelActive ? "translate-y-full" : "translate-y-0"
            }`}
          >
            <form onSubmit={handleSignInSubmit} className="flex flex-col items-center justify-center h-full bg-white">
              <label
                onClick={() => setRightPanelActive(false)}
                className="text-3xl font-bold text-[#78e08f] cursor-pointer mb-6"
              >
                Login
              </label>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-4/5 py-2 px-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-4/5 py-2 px-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-4/5 py-2 mt-2 text-white font-bold bg-[#573b8a] rounded-md hover:bg-[#6d44b8] transition"
              >
                Login
              </button>
              <p
                onClick={() => setRightPanelActive(true)}
                className="mt-4 text-sm text-gray-600 cursor-pointer hover:underline"
              >
                Don't have an account? Sign Up
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
