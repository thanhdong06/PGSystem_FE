import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from './Chart';
import PostForm from './PostForm';
import CommunityPosts from './CommunityPosts';
import DataTable from './DataTable';
import { fetalGrowthData } from './fetalData'; 
import { Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

const PregnancyTracker = () => {
  const location = useLocation();
  const babyId = location.state?.babyId;
  
  // ... rest of the imports

  if (!babyId) {
    const navigate = useNavigate();
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Empty
          description={
            <span className="text-gray-500">Please select or create a baby profile to view data</span>
          }
        />
        <button
          onClick={() => navigate('/member/createFetalProfile')}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create New Baby Profile
        </button>
      </div>
    );
  }

  // Standard growth data (giữ nguyên)
  const standardGrowthData = [
    { week: 8, height: 1.6, weight: 1 },
    { week: 9, height: 2.3, weight: 2 },
    // ... (giữ nguyên toàn bộ standardGrowthData của bạn)
    { week: 42, height: 51.7, weight: 3700 }
  ];

  // Load growth data từ localStorage hoặc dùng dữ liệu giả
  const [growthData, setGrowthData] = useState(() => {
    try {
      const savedData = localStorage.getItem(`growthData_${babyId}`);
      return savedData ? JSON.parse(savedData) : fetalGrowthData.filter(data => data.babyId === babyId);
    } catch (error) {
      console.error("Error loading growth data from localStorage:", error);
      return fetalGrowthData.filter(data => data.babyId === babyId);
    }
  });

  // Save growth data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(`growthData_${babyId}`, JSON.stringify(growthData));
    } catch (error) {
      console.error("Error saving growth data to localStorage:", error);
    }
  }, [growthData, babyId]);

  // Form data state
  const [formData, setFormData] = useState({
    week: '',
    weight: '',
    height: ''
  });

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission to add new growth data
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const newEntry = {
      babyId, // Thêm babyId vào mỗi entry
      week: parseInt(formData.week),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height)
    };
    
    if (isNaN(newEntry.week) || isNaN(newEntry.weight) || isNaN(newEntry.height)) {
      alert('Please enter valid numbers for all fields');
      return;
    }
    
    const existingEntryIndex = growthData.findIndex(item => item.week === newEntry.week && item.babyId === babyId);
    
    if (existingEntryIndex >= 0) {
      const updatedData = [...growthData];
      updatedData[existingEntryIndex] = newEntry;
      setGrowthData(updatedData);
    } else {
      setGrowthData([...growthData, newEntry]);
    }
    
    setFormData({
      week: '',
      weight: '',
      height: ''
    });
  };

  // Compute weekly data
  const weeklyData = React.useMemo(() => {
    return [...growthData].sort((a, b) => a.week - b.week);
  }, [growthData]);

  const [currentView, setCurrentView] = useState('chart');
  const [viewMode, setViewMode] = useState('week');
  const [activeMetric, setActiveMetric] = useState('weight');

  // Community posts state (giữ nguyên)
  const [posts, setPosts] = useState([
    // ... (giữ nguyên posts của bạn)
  ]);

  // User info (giữ nguyên)
  const [user, setUser] = useState({ fullName: 'Sarah' });
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

  return (
    <div className="w-fit mx-auto py-6 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Pregnancy Growth Tracker Community</h1>
        <p className="text-gray-600 mt-2">Tracking Baby ID: {babyId}</p> {/* Hiển thị babyId */}
      </header>
      
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mr-4 rounded-md transition-colors ${currentView === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setCurrentView('chart')}
        >
          Chart View
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${currentView === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setCurrentView('table')}
        >
          Data Table
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Welcome, {user.fullName}</h2>
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
              <h3 className="font-medium mb-2">Add Growth Data for {babyId}</h3>
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
          {currentView === 'chart' ? (
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