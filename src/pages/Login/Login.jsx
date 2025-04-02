  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import Footer from "../../components/footer/Footer";
  import "react-toastify/dist/ReactToastify.css";

  const Login = () => {
    const [rightPanelActive, setRightPanelActive] = useState(true);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle Sign In
    const handleSignInSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
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
          console.log(data);
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

          // Store token and complete user object in local storage
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));
          console.log("Saved token from localStorage:", localStorage.getItem("token"));

          // Use setTimeout to wait for notification before redirecting
          setTimeout(() => {
            if (user.role === "Admin") {
              navigate("/admin");
            } else {
              navigate("/home");
            }
          }, 1000);
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
      } finally {
        setLoading(false);
      }
    };

    // Handle Sign Up
    const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
    
      // Validate phone number: only 10 digits allowed
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        toast.error("Invalid phone number. Please enter exactly 10 digits.", {
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
        setLoading(false);
        return;
      }
    
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
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#4776E6] via-[#8E54E9] to-[#4776E6] bg-size-200 animate-gradient-slow">
          <div className="relative w-[800px] h-[600px] shadow-2xl overflow-hidden rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg">
            {/* Left Panel - Content and Graphics */}
            <div className="absolute top-0 left-0 w-1/2 h-full relative text-white">
    {/* Nội dung Sign In */}
    <div
      className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-700 transform ${
        rightPanelActive
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
      <p className="text-center mb-6">
        To keep connected with us, please login with your personal info
      </p>
      <button
        onClick={() => setRightPanelActive(false)}
        className="px-8 py-2 rounded-full border-2 border-white hover:bg-white hover:text-[#8E54E9] transition-colors duration-300"
      >
        Sign In
      </button>
    </div>

    {/* Nội dung Sign Up */}
    <div
      className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-700 transform ${
        rightPanelActive
          ? "translate-x-full opacity-0 pointer-events-none"
          : "translate-x-0 opacity-100"
      }`}
    >
      <h1 className="text-3xl font-bold mb-5">Hello, Friend!</h1>
      <p className="text-center mb-6">
        Enter your personal details and start your journey with us
      </p>
      <button
        onClick={() => setRightPanelActive(true)}
        className="px-8 py-2 rounded-full border-2 border-white hover:bg-white hover:text-[#8E54E9] transition-colors duration-300"
      >
        Sign Up
      </button>
    </div>
  </div>


            {/* Right Panel - Forms */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white rounded-l-2xl shadow-xl transform transition-transform duration-700 ease-in-out">
              {/* Animated Container */}
              <div className="relative w-full h-full">
                {/* Sign Up Form */}
                <div className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${rightPanelActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                  <form onSubmit={handleSignUpSubmit} className="flex flex-col items-center justify-center h-full px-10">
                    <h1 className="text-3xl font-bold text-[#4776E6] mb-8">Create Account</h1>
                    
                    <div className="w-full mb-4 relative">
                      <input
                        type="email"
                        placeholder=" "
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3 px-4 border-b-2 border-gray-300 focus:border-[#8E54E9] outline-none transition-all"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none transform origin-left">Email</label>
                    </div>
                    
                    <div className="w-full mb-4 relative">
                      <input
                        type="text"
                        placeholder=" "
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full py-3 px-4 border-b-2 border-gray-300 focus:border-[#8E54E9] outline-none transition-all"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none transform origin-left">Full Name</label>
                    </div>
                    
                    <div className="w-full mb-4 relative">
                      <input
                        type="tel"
                        placeholder=" "
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full py-3 px-4 border-b-2 border-gray-300 focus:border-[#8E54E9] outline-none transition-all"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none transform origin-left">Phone</label>
                    </div>
                    
                    <div className="w-full mb-6 relative">
                      <input
                        type="password"
                        placeholder=" "
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-3 px-4 border-b-2 border-gray-300 focus:border-[#8E54E9] outline-none transition-all"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none transform origin-left">Password</label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 mt-4 text-white font-bold bg-gradient-to-r from-[#4776E6] to-[#8E54E9] rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {loading ? (
                        <span className="flex justify-center items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </span>
                      ) : "Sign Up"}
                    </button>
                  </form>
                </div>

                {/* Sign In Form */}
                <div className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${rightPanelActive ? "opacity-0 z-0" : "opacity-100 z-10"}`}>
                  <form onSubmit={handleSignInSubmit} className="flex flex-col items-center justify-center h-full px-10">
                    <h1 className="text-3xl font-bold text-[#4776E6] mb-8">Sign in to Account</h1>
                    
                    <div className="w-full mb-4 relative group">
                      <input
                        type="email"
                        placeholder=" "
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3 px-4 border-b-2 border-gray-300 focus:border-[#8E54E9] outline-none transition-all peer"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:text-[#8E54E9] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-sm">Email</label>
                    </div>
                    
                    <div className="w-full mb-6 relative group">
                      <input
                        type="password"
                        placeholder=" "
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-3 px-4 border-b-2 border-gray-300 focus:border-[#8E54E9] outline-none transition-all peer"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:text-[#8E54E9] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-sm">Password</label>
                    </div>
                    
                    <p className="w-full text-right mb-6">
                      <a href="#" className="text-sm text-gray-600 hover:text-[#8E54E9]">Forgot your password?</a>
                    </p>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 text-white font-bold bg-gradient-to-r from-[#4776E6] to-[#8E54E9] rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {loading ? (
                        <span className="flex justify-center items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing In...
                        </span>
                      ) : "Sign In"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />

        {/* Add custom styles for floating labels */}
        <style jsx>{`
          input:focus ~ label,
          input:not(:placeholder-shown) ~ label {
            transform: translateY(-24px) scale(0.85);
            color: #8E54E9;
          }
          
          .animate-gradient-slow {
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
          }
          
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </>
    );
  };

  export default Login;