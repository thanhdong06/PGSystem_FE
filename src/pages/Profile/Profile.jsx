import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";

const ProfileUI = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
        }

        const response = await fetch("https://your-api-endpoint.com/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Lỗi khi tải thông tin người dùng");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (err) {
            console.error("Error parsing stored user data:", err);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Không tìm thấy thông tin người dùng
      </div>
    );
  }

  // Nếu các trường chưa có, hiển thị giá trị mặc định
  const fullName = user.fullName || user.name || "Chưa cập nhật tên đầy đủ";
  const email = user.email || "Chưa cập nhật email";
  const phone = user.phone || "Chưa cập nhật số điện thoại";
  const location = user.location || "Chưa cập nhật địa chỉ";
  const avatar = user.avatar || "https://i.pravatar.cc/300";

  return (
    <>
      {/* Nền gradient toàn trang */}
      <div className="bg-gradient-to-b from-[#c7ecee] via-[#82ccdd] to-[#079992] min-h-screen flex items-center justify-center p-4">
        {/* Khối chứa thông tin */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
          {/* Bố cục flex: hình bên trái, thông tin bên phải */}
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Cột hình đại diện + nút Edit */}
            <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
              <img
                src={avatar}
                alt="Profile Picture"
                className="rounded-full w-40 h-40 object-cover border-4 border-indigo-800 mb-4"
              />
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                Edit Profile
              </button>
            </div>

            {/* Cột thông tin chi tiết */}
            <div className="md:w-2/3 md:ml-8 text-center md:text-left">
              <h1 className="text-2xl font-bold text-indigo-800 mb-2">
                {fullName}
              </h1>
              <p className="text-gray-600 mb-6">Software Developer</p>

              <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                Organization Information
              </h2>
              <p className="text-gray-700 mb-6">
                Estep Bilişim / Software Developer
              </p>

              <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                Contact Information
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-center md:justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {email}
                </li>
                <li className="flex justify-center md:justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {phone}
                </li>
                <li className="flex justify-center md:justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  San Francisco,  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileUI;
