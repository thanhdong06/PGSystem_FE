// EnhancedFetalGrowthTracker.jsx
import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import UpdateData from './UpdateData';
import DataTable from './DataTable';
import Footer from '../../components/footer/Footer';

const EnhancedFetalGrowthTracker = () => {
  // Khởi tạo dữ liệu mẫu
  const [growthData, setGrowthData] = useState([
    { day: 84, week: 12, weight: 14, height: 5.4, date: '2025-01-10' },
    { day: 98, week: 14, weight: 43, height: 8.7, date: '2025-01-24' },
    { day: 112, week: 16, weight: 100, height: 14.0, date: '2025-02-07' },
    { day: 126, week: 18, weight: 190, height: 18.5, date: '2025-02-21' },
    { day: 140, week: 20, weight: 300, height: 25.0, date: '2025-03-07' },
    { day: 154, week: 22, weight: 430, height: 27.8, date: '2025-03-21' },
    { day: 168, week: 24, weight: 600, height: 30.0, date: '2025-04-04' }
  ]);

  const [activeTab, setActiveTab] = useState('chart');
  const [viewMode, setViewMode] = useState('week');
  const [activeMetric, setActiveMetric] = useState('weight');
  const [tableViewMode, setTableViewMode] = useState('week');
  const [weeklyData, setWeeklyData] = useState([]);

  // Tính toán dữ liệu theo tuần dựa trên growthData
  useEffect(() => {
    const weekMap = {};

    growthData.forEach(entry => {
      const week = entry.week;
      if (!weekMap[week]) {
        weekMap[week] = {
          count: 0,
          totalWeight: 0,
          totalHeight: 0,
          latestDate: entry.date
        };
      }

      weekMap[week].count++;
      weekMap[week].totalWeight += entry.weight;
      weekMap[week].totalHeight += entry.height;

      if (entry.date > weekMap[week].latestDate) {
        weekMap[week].latestDate = entry.date;
      }
    });

    const weeklyDataArray = Object.keys(weekMap).map(week => ({
      week: parseInt(week),
      weight: weekMap[week].totalWeight / weekMap[week].count,
      height: weekMap[week].totalHeight / weekMap[week].count,
      date: weekMap[week].latestDate
    }));

    setWeeklyData(weeklyDataArray.sort((a, b) => a.week - b.week));
  }, [growthData]);

  return (
    <>
      <div className="p-4 bg-gray-50 rounded-lg max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Fetal Growth Tracker</h1>
        
        {/* Điều hướng các tab */}
        <div className="flex mb-6 border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'chart' ? 'text-blue-600 border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('chart')}
          >
            Growth Chart
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'update' ? 'text-blue-600 border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('update')}
          >
            Update Data
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'table' ? 'text-blue-600 border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('table')}
          >
            Data Table
          </button>
        </div>

        {activeTab === 'chart' && (
          <Chart 
            growthData={growthData} 
            weeklyData={weeklyData} 
            viewMode={viewMode} 
            setViewMode={setViewMode}
            activeMetric={activeMetric}
            setActiveMetric={setActiveMetric}
          />
        )}

        {activeTab === 'update' && (
          <UpdateData 
            growthData={growthData} 
            setGrowthData={setGrowthData} 
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'table' && (
          <DataTable 
            growthData={growthData} 
            weeklyData={weeklyData} 
            tableViewMode={tableViewMode} 
            setTableViewMode={setTableViewMode}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default EnhancedFetalGrowthTracker;
