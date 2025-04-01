import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import AddDataForm from './AddDataForm';
import PostForm from './PostForm';
import CommunityPosts from './CommunityPosts';
import DataTable from './DataTable';

const PregnancyTracker = () => {
  // Sample data for demonstration (bao gồm thuộc tính date cho DataTable)
  const [growthData, setGrowthData] = useState([
    { day: 56, week: 8, weight: 5, height: 1.8, date: "2025-01-01" },
    { day: 84, week: 12, weight: 45, height: 6.5, date: "2025-01-29" },
    { day: 112, week: 16, weight: 110, height: 14, date: "2025-02-26" },
    { day: 140, week: 20, weight: 320, height: 25, date: "2025-03-26" },
    { day: 168, week: 24, weight: 640, height: 30, date: "2025-04-23" },
    { day: 196, week: 28, weight: 1000, height: 36, date: "2025-05-21" },
    { day: 224, week: 32, weight: 1700, height: 42, date: "2025-06-18" },
    { day: 252, week: 36, weight: 2600, height: 47, date: "2025-07-16" },
    { day: 280, week: 40, weight: 3400, height: 50, date: "2025-08-13" },
  ]);

  // Weekly data (ví dụ: dữ liệu đã được tổng hợp theo tuần)
  const [weeklyData, setWeeklyData] = useState([
    { week: 8, weight: 5, height: 1.8, date: "2025-01-01" },
    { week: 12, weight: 45, height: 6.5, date: "2025-01-29" },
    { week: 16, weight: 110, height: 14, date: "2025-02-26" },
    { week: 20, weight: 320, height: 25, date: "2025-03-26" },
    { week: 24, weight: 640, height: 30, date: "2025-04-23" },
    { week: 28, weight: 1000, height: 36, date: "2025-05-21" },
    { week: 32, weight: 1700, height: 42, date: "2025-06-18" },
    { week: 36, weight: 2600, height: 47, date: "2025-07-16" },
    { week: 40, weight: 3400, height: 50, date: "2025-08-13" },
  ]);

  // State cho chế độ hiển thị chính: chart hoặc table
  const [currentView, setCurrentView] = useState('chart');

  // Các state khác của ứng dụng
  const [viewMode, setViewMode] = useState('week');
  const [activeMetric, setActiveMetric] = useState('weight');

  // Community posts with experiences
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "Maria123",
      week: 28,
      title: "Amazing growth this month!",
      content: "Baby has been growing so fast this month. The doctor says everything is right on track!",
      likes: 12,
      comments: 5,
      date: "March 25, 2025"
    },
    {
      id: 2,
      username: "PregnancyJourney",
      week: 32,
      title: "Concerned about weight gain",
      content: "Has anyone else noticed their baby's weight measuring slightly below the average? Doctor isn't concerned but I'd love to hear others' experiences.",
      likes: 24,
      comments: 18,
      date: "March 28, 2025"
    }
  ]);

  // Lấy thông tin user (full name) từ localStorage
  const [user, setUser] = useState({ fullName: 'Sarah' });
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Pregnancy Growth Tracker Community</h1>
        <p className="text-gray-600 mt-2">Share your journey and track your baby's development</p>
      </header>
      
      {/* Thanh chuyển đổi view: Chart hoặc Data Table */}
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
        {/* Left sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
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
            <AddDataForm growthData={growthData} setGrowthData={setGrowthData} />
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="font-medium mb-3">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                    </svg>
                    Fetal growth charts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                    Weekly development guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                    </svg>
                    Community support groups
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className="lg:col-span-2">
          {currentView === 'chart' ? (
            <Chart 
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
              tableViewMode={'week'}
              setTableViewMode={() => {}}
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
