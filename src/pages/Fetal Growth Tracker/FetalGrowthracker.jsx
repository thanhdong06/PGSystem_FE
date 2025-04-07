import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from './Chart';
import PostForm from './PostForm';
import CommunityPosts from './CommunityPosts';
import DataTable from './DataTable';
import axios from 'axios';
import { Spin } from 'antd';

const PregnancyTracker = () => {
  const location = useLocation();
  const babyId = location.state?.babyId || 'B001';

  const standardGrowthData = [
    { week: 8, height: 1.6, weight: 1 },
    { week: 9, height: 2.3, weight: 2 },
    { week: 10, height: 3.1, weight: 4 },
    { week: 11, height: 4.1, weight: 45 },
    { week: 12, height: 5.4, weight: 58 },
    { week: 13, height: 6.7, weight: 73 },
    { week: 14, height: 14.7, weight: 93 },
    { week: 15, height: 16.7, weight: 117 },
    { week: 16, height: 18.6, weight: 146 },
    { week: 17, height: 20.4, weight: 181 },
    { week: 18, height: 22.2, weight: 222 },
    { week: 19, height: 24.0, weight: 272 },
    { week: 20, height: 25.7, weight: 330 },
    { week: 21, height: 27.4, weight: 400 },
    { week: 22, height: 29, weight: 476 },
    { week: 23, height: 30.6, weight: 565 },
    { week: 24, height: 32.2, weight: 665 },
    { week: 25, height: 33.7, weight: 756 },
    { week: 26, height: 35.1, weight: 900 },
    { week: 27, height: 36.6, weight: 1000 },
    { week: 28, height: 37.6, weight: 1100 },
    { week: 29, height: 39.3, weight: 1239 },
    { week: 30, height: 40.5, weight: 1396 },
    { week: 31, height: 41.8, weight: 1568 },
    { week: 32, height: 43.0, weight: 1755 },
    { week: 33, height: 44.1, weight: 2000 },
    { week: 34, height: 45.3, weight: 2200 },
    { week: 35, height: 46.3, weight: 2378 },
    { week: 36, height: 47.3, weight: 2600 },
    { week: 37, height: 48.3, weight: 2800 },
    { week: 38, height: 49.3, weight: 3000 },
    { week: 39, height: 50.1, weight: 3186 },
    { week: 40, height: 51.0, weight: 3338 },
    { week: 41, height: 51.5, weight: 3600 },
    { week: 42, height: 51.7, weight: 3700 }
  ];

  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://676a399b863eaa5ac0ddb3ec.mockapi.io/api/fetalProfiles');
        const data = response.data[0]?.measurements || []; 
        setGrowthData(data.map(item => ({ ...item, babyId })));
      } catch (error) {
        console.error('Error fetching growth data:', error);
        setGrowthData([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchGrowthData();
  }, [babyId]);

  const [formData, setFormData] = useState({
    week: '',
    weight: '',
    height: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const newEntry = {
      babyId,
      week: parseInt(formData.week),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height)
    };
    
    if (isNaN(newEntry.week) || isNaN(newEntry.weight) || isNaN(newEntry.height)) {
      alert('Please enter valid numbers for all fields');
      return;
    }
    try {
    setLoading(true);
    const response = await axios.get(`https://676a399b863eaa5ac0ddb3ec.mockapi.io/api/fetalGrowthData?babyId=${babyId}`);
      const currentData = response.data[0];
      
      const existingMeasurements = currentData?.measurements || [];
      const existingEntryIndex = existingMeasurements.findIndex(item => item.week === newEntry.week);
      
      let updatedMeasurements;
      if (existingEntryIndex >= 0) {
        updatedMeasurements = [...existingMeasurements];
        updatedMeasurements[existingEntryIndex] = { week: newEntry.week, weight: newEntry.weight, height: newEntry.height };
      } else {
        updatedMeasurements = [...existingMeasurements, { week: newEntry.week, weight: newEntry.weight, height: newEntry.height }];
      }

      await axios.put(`https://676a399b863eaa5ac0ddb3ec.mockapi.io/api/fetalGrowthData/${currentData.id}`, {
        ...currentData,
        measurements: updatedMeasurements
      });

      setGrowthData(updatedMeasurements.map(item => ({ ...item, babyId })));
      
      setFormData({
        week: '',
        weight: '',
        height: ''
      });
    } catch (error) {
      console.error('Error updating growth data:', error);
      alert('Failed to save data');
    }
  };

  const weeklyData = React.useMemo(() => {
    return [...growthData].sort((a, b) => a.week - b.week);
  }, [growthData]);

  const [currentView, setCurrentView] = useState('chart');
  const [viewMode, setViewMode] = useState('week');
  const [activeMetric, setActiveMetric] = useState('weight');

  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "Maria123",
      week: 28,
      title: "Amazing growth this month!",
      content: "Baby has been growing so fast this month. The doctor says everything is right on track!",
      likes: 12,
      comments: 5,
    },
    {
      id: 2,
      username: "PregnancyJourney",
      week: 32,
      title: "Concerned about weight gain",
      content: "Has anyone else noticed their baby's weight measuring slightly below the average? Doctor isn't concerned but I'd love to hear others' experiences.",
      likes: 24,
      comments: 18,
    }
  ]);

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

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" tip="Loading..." />
    </div>;
  }

  return (
    <div className="w-fit mx-auto py-6 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Pregnancy Growth Tracker Community</h1>
        <p className="text-gray-600 mt-2">Tracking Baby ID: {babyId}</p>
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
// 676a399b863eaa5ac0ddb3ec.mockapi.io
