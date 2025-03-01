import React, { useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Thêm state cho phone (dùng cho Sign Up)
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

      // Token thực sự nằm ở data.value.data.token
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

        // Lưu thông tin vào localStorage
        localStorage.setItem("Token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("email", user.email);
        localStorage.setItem("phone", user.phone);
        localStorage.setItem("role", user.role);

        console.log("Saved token from localStorage:", localStorage.getItem("Token"));

        // Chuyển hướng sau khi đăng nhập thành công (có thể bỏ comment khi sẵn sàng)
        // window.location.href = "/";
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
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Authentication/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Lưu ý: curl mẫu có header 'accept: text/plain', bạn có thể thêm nếu cần:
            // "accept": "text/plain",
          },
          body: JSON.stringify({ email, password, phone }),
        }
      );

      if (!response.ok) {
        throw new Error("Register failed");
      }

      // Nếu API trả về dạng text, sử dụng response.text()
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

      // Reset input và chuyển về chế độ Sign In sau khi đăng ký thành công
      setEmail("");
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
      <div className="login-container animate-gradient flex justify-center items-center min-h-screen">
        <div className="login-box bg-white rounded-lg shadow-lg w-80 p-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">
            {rightPanelActive ? "Create Account" : "Sign In"}
          </h1>

          <form
            onSubmit={rightPanelActive ? handleSignUpSubmit : handleSignInSubmit}
            className="w-full"
          >
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Hiển thị trường Phone khi ở chế độ Sign Up */}
            {rightPanelActive && (
              <input
                type="tel"
                placeholder="Phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Chỉ hiển thị link Forgot password khi ở chế độ Sign In */}
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
