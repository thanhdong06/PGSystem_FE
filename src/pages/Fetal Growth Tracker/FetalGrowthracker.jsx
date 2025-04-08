import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chart from "./Chart";
import PostForm from "./PostForm";
import CommunityPosts from "./CommunityPosts";
import DataTable from "./DataTable";
import axiosInstance from "../../api/axiosInstance"; 
import { Spin } from "antd";
import { standardGrowthData } from "./fetalData";
import { toast } from "react-toastify";
import axios from "axios";

const PregnancyTracker = () => {
  const location = useLocation();
  const babyId = location.state?.babyId; // fetusId từ state, không mặc định nữa
  const profileId = location.state?.profileId; // fetusId từ state, không mặc định nữa

  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetusName, setFetusName] = useState(true);
  
  const fetchFetusName = async () => {
    try {
      const response = await axiosInstance.get(
        `Fetus/Fetuses?pregnancyRecordId=${profileId}`
      );
      const fetuses = response.data.data || [];
      const fetus = fetuses.find((f) => f.fetusId === babyId);
      setFetusName(fetus ? fetus.nickname : "Unknown");
    } catch (error) {
      console.error("Error fetching fetus name:", error);
      setFetusName("Unknown");
    }
  };
  const fetchGrowthData = async () => {
    if (!babyId) {
      console.error("No fetusId provided");
      setGrowthData([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `Fetus/Measurements/Fetus?fetusId=${babyId}`
      );
      const data = response.data.data || []; 
      setGrowthData(
        data.map((item) => ({
          measurementId: item.measurementId,
          week: item.week,
          weight: item.weightEstimate,
          height: item.length, 
          babyId: babyId,
          dateMeasured: item.dateMeasured, 
        }))
      );
    } catch (error) {
      console.error("Error fetching growth data:", error);
      setGrowthData([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFetusName();
    fetchGrowthData();
  }, [babyId]);

  const [formData, setFormData] = useState({
    week: "",
    weight: "",
    height: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      babyId,
      week: parseInt(formData.week),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
    };

    if (isNaN(newEntry.week) || isNaN(newEntry.weight) || isNaN(newEntry.height)) {
      alert("Please enter valid numbers for all fields");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post(`Fetus/FetusMeasurements?fetusId=${babyId}`, {
        fetusId: babyId,
        dateMeasured: new Date().toISOString().split("T")[0], 
        length: newEntry.height,
        weightEstimate: newEntry.weight,
        week: newEntry.week,
      });

      const response = await axiosInstance.get(
        `Fetus/Measurements/Fetus?fetusId=${babyId}`
      );
      const updatedData = response.data.data || [];
      setGrowthData(
        updatedData.map((item) => ({
          week: item.week,
          weight: item.weightEstimate,
          height: item.length,
          babyId: babyId,
          dateMeasured: item.dateMeasured,
        }))
      );

      setFormData({
        week: "",
        weight: "",
        height: "",
      });
      toast.success("Data saved successfully");
    } catch (error) {
      console.error("Error updating growth data:", error);
      toast.error(error.response?.data?.error || "Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  const weeklyData = React.useMemo(() => {
    return [...growthData].sort((a, b) => a.week - b.week);
  }, [growthData]);

  const [currentView, setCurrentView] = useState("chart");
  const [viewMode, setViewMode] = useState("week");
  const [activeMetric, setActiveMetric] = useState("weight");

  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "Maria123",
      week: 28,
      title: "Amazing growth this month!",
      content:
        "Baby has been growing so fast this month. The doctor says everything is right on track!",
      likes: 12,
      comments: 5,
    },
    {
      id: 2,
      username: "PregnancyJourney",
      week: 32,
      title: "Concerned about weight gain",
      content:
        "Has anyone else noticed their baby's weight measuring slightly below the average? Doctor isn't concerned but I'd love to hear others' experiences.",
      likes: 24,
      comments: 18,
    },
  ]);

  const [user, setUser] = useState({ fullName: "Sarah" });
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div className="w-fit mx-auto py-6 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">
          Pregnancy Growth Tracker Community
        </h1>
        <p className="text-gray-600 mt-2">Tracking Baby ID: <strong className="text-red-500 text-xl uppercase ">{fetusName}</strong></p>
      </header>

      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mr-4 rounded-md transition-colors ${
            currentView === "chart"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentView("chart")}
        >
          Chart View
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            currentView === "table"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentView("table")}
        >
          Data Table
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Welcome, {user.fullName}
                </h2>
                <p className="text-gray-600">Current week: 32</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="font-medium mb-2">Your pregnancy milestones</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>First ultrasound</span>
                  <span className="text-gray-600">Week 8</span>
                </li>
                <li className="flex justify-between">
                  <span>Gender reveal</span>
                  <span className="text-gray-600">Week 20</span>
                </li>
                <li className="flex justify-between">
                  <span>Third trimester</span>
                  <span className="text-gray-600">Week 28</span>
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Add Growth Data for {fetusName}</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div>
                    <label className="block text-sm mb-1">Week</label>
                    <input
                      type="number"
                      name="week"
                      value={formData.week}
                      onChange={handleFormChange}
                      className="w-full px-2 py-1 border rounded"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Weight (g)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleFormChange}
                      className="w-full px-2 py-1 border rounded"
                      step="0.1"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleFormChange}
                      className="w-full px-2 py-1 border rounded"
                      step="0.1"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Add Entry
                </button>
              </form>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-2">
          {currentView === "chart" ? (
            <Chart
              standardGrowthData={standardGrowthData}
              growthData={growthData}
              viewMode={viewMode}
              setViewMode={setViewMode}
              activeMetric={activeMetric}
              setActiveMetric={setActiveMetric}
            />
          ) : (
            <DataTable
              growthData={growthData}
              weeklyData={weeklyData}
              fetchGrowthData={fetchGrowthData}
              tableViewMode={viewMode}
              setTableViewMode={setViewMode}
            />
          )}
          <PostForm posts={posts} setPosts={setPosts} />
          <CommunityPosts posts={posts} />
        </main>
      </div>
    </div>
  );
};

export default PregnancyTracker;