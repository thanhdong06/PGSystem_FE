import React, { useEffect, useState } from "react";
import TitleCard from "./TitleCard";
import InputText from "./InputText";
import TextAreaInput from "./TextAreaInput";
import Footer from "../../components/footer/Footer";

const ProfileUI = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data on mount
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
        // Fallback: use stored user data if available
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

  // Called when the "Update" button is clicked
  const updateProfile = () => {
    console.log("Update Profile");
  };

  // Handler for when any input field is updated
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType, value);
  };

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

  // Set default values with fallbacks
  const fullName = user.fullName || user.name || "Alex";
  const email = user.email || "alex@dashwind.com";
  const title = user.title || "UI/UX Designer";
  const place = user.place || "California";
  const about = user.about || "Doing what I love, part time traveller";
  const phone = user.phone || "";
  const avatar = user.avatar || "https://i.pravatar.cc/300";

  return (
    <>
      {/* Full page gradient background */}
      <div className="bg-gradient-to-b from-[#c7ecee] via-[#82ccdd] to-[#079992] min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <TitleCard title="Profile Settings" topMargin="mt-2">
            {/* Avatar Section */}
            <div className="flex justify-center mb-6">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="rounded-full w-40 h-40 object-cover border-4 border-indigo-800"
              />
            </div>

            {/* Grid for Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputText labelTitle="Name" defaultValue={fullName} updateFormValue={updateFormValue} />

              {/* Email displayed as static text */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Email Id</label>
                <span className="mt-1 p-2 border border-gray-300 rounded bg-gray-100">{email}</span>
              </div>

              <InputText labelTitle="Phone" defaultValue={phone} updateFormValue={updateFormValue} />
              <InputText labelTitle="Job" defaultValue={title} updateFormValue={updateFormValue} />
              <InputText labelTitle="Place" defaultValue={place} updateFormValue={updateFormValue} />
              <TextAreaInput labelTitle="About" defaultValue={about} updateFormValue={updateFormValue} />
            </div>
            <div className="divider"></div>
            {/* Grid for Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Các trường khác nếu cần */}
            </div>

            {/* Update Button */}
            <div className="mt-16">
              <button className="btn btn-primary float-right" onClick={updateProfile}>
                Update
              </button>
            </div>
          </TitleCard>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileUI;
