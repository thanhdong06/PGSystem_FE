import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";

// Profile UI component with enhanced design and lower avatar position
const ProfileUI = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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
        // Initialize form data with user data
        setFormData({
          fullName: data.fullName || data.name || "Alex",
          title: data.title || "UI/UX Designer",
          place: data.place || "California",
          about: data.about || "Doing what I love, part time traveller",
          phone: data.phone || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Fallback: use stored user data if available
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // Initialize form data with parsed user data
            setFormData({
              fullName: parsedUser.fullName || parsedUser.name || "Alex",
              title: parsedUser.title || "UI/UX Designer",
              place: parsedUser.place || "California",
              about: parsedUser.about || "Doing what I love, part time traveller",
              phone: parsedUser.phone || "",
            });
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

  // Update form data when inputs change
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle profile update
  const updateProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      // Implement actual API call here
      console.log("Updating profile with data:", formData);
      
      // Simulating API call success
      setTimeout(() => {
        setUser({
          ...user,
          ...formData,
        });
        setIsEditing(false);
        setLoading(false);
      }, 1000);
      
      // Uncomment for actual implementation
      /*
      const response = await fetch("https://your-api-endpoint.com/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      */
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Custom Input Component
  const InputField = ({ label, field, value, type = "text", disabled = false }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {isEditing && !disabled ? (
        type === "textarea" ? (
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            rows="4"
          />
        ) : (
          <input
            type={type}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        )
      ) : (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
          {type === "textarea" ? (
            <p className="whitespace-pre-wrap">{value}</p>
          ) : (
            value || "-"
          )}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-gray-700">Loading profile information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium text-gray-700">Không tìm thấy thông tin người dùng</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => window.location.href = "/login"}
            >
              Đăng nhập lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Set default values with fallbacks
  const email = user.email || "alex@dashwind.com";
  const avatar = user.avatar || "https://i.pravatar.cc/300";

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 min-h-screen pb-8">
      {/* Header with page title only */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        </div>
      </div>
      
      {/* Main content with lower avatar position */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* Avatar section moved inside the card */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover shadow-md"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white shadow-md hover:bg-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{formData.fullName}</h2>
            <p className="text-gray-600">{formData.title}</p>
            <p className="text-gray-500 text-sm">{formData.place}</p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            <button
              onClick={() => isEditing ? updateProfile() : setIsEditing(true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isEditing
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" field="fullName" value={formData.fullName} />
            <InputField label="Email" field="email" value={email} disabled={true} />
            <InputField label="Phone Number" field="phone" value={formData.phone} />
            <InputField label="Occupation" field="title" value={formData.title} />
            <InputField label="Location" field="place" value={formData.place} />
            <div className="md:col-span-2">
              <InputField label="About Me" field="about" value={formData.about} type="textarea" />
            </div>
          </div>
          
          {isEditing && (
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updateProfile}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
        
        {/* Additional sections */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Password</h4>
                <p className="text-sm text-gray-500">Last updated 3 months ago</p>
              </div>
              <button className="px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                Change
              </button>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Not enabled</p>
              </div>
              <button className="px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                Enable
              </button>
            </div>
          </div>
        </div>
        
        {/* Notification preferences section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive updates and alerts by email</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input type="checkbox" id="email-toggle" defaultChecked className="sr-only" />
                <label htmlFor="email-toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                  <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out"></span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-gray-500">Receive notifications on your device</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input type="checkbox" id="push-toggle" className="sr-only" />
                <label htmlFor="push-toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                  <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfileUI;