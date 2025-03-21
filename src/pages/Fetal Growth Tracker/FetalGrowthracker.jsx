import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer';

const EnhancedFetalGrowthTracker = () => {
  // Sample data including daily entries
  // const [growthData, setGrowthData] = useState([
  //   { day: 84, week: 12, weight: 14, height: 5.4, date: '2025-01-10' },
  //   { day: 98, week: 14, weight: 43, height: 8.7, date: '2025-01-24' },
  //   { day: 112, week: 16, weight: 100, height: 14.0, date: '2025-02-07' },
  //   { day: 126, week: 18, weight: 190, height: 18.5, date: '2025-02-21' },
  //   { day: 140, week: 20, weight: 300, height: 25.0, date: '2025-03-07' },
  //   { day: 154, week: 22, weight: 430, height: 27.8, date: '2025-03-21' },
  //   { day: 168, week: 24, weight: 600, height: 30.0, date: '2025-04-04' }
  // ]);
  
  const [newEntry, setNewEntry] = useState({
    day: '',
    week: '',
    weight: '',
    height: '',
    date: ''
  });
  
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('chart');
  const [viewMode, setViewMode] = useState('week');
  const [activeMetric, setActiveMetric] = useState('weight');
  const [tableViewMode, setTableViewMode] = useState('week');

  // Weekly aggregated data (calculated from daily data)
  const [weeklyData, setWeeklyData] = useState([]);

  // Calculate weekly data from daily data
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'day') {
      // Calculate week based on day
      const weekValue = Math.floor(parseInt(value) / 7);
      setNewEntry({
        ...newEntry,
        [name]: value,
        week: weekValue || ''
      });
    } else if (name === 'week') {
      // Calculate day based on week (approximate mid-week)
      const dayValue = parseInt(value) * 7;
      setNewEntry({
        ...newEntry,
        [name]: value,
        day: dayValue || ''
      });
    } else {
      setNewEntry({
        ...newEntry,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newEntry.day || !newEntry.week || !newEntry.weight || !newEntry.height || !newEntry.date) {
      setError('Please fill in all fields');
      return;
    }
    
    const dayNum = parseInt(newEntry.day);
    const weekNum = parseInt(newEntry.week);
    
    if (dayNum < 56 || dayNum > 294) {
      setError('Day must be between 56 and 294 (8-42 weeks)');
      return;
    }
    
    if (weekNum < 8 || weekNum > 42) {
      setError('Week must be between 8 and 42');
      return;
    }
    
    // Check if day already exists
    const existingIndex = growthData.findIndex(item => item.day === dayNum);
    
    let updatedData;
    if (existingIndex >= 0) {
      // Update existing entry
      updatedData = growthData.map((item, index) => 
        index === existingIndex ? 
          { 
            ...item, 
            weight: parseFloat(newEntry.weight), 
            height: parseFloat(newEntry.height),
            date: newEntry.date
          } : 
          item
      );
    } else {
      // Add new entry
      updatedData = [
        ...growthData, 
        { 
          day: dayNum, 
          week: weekNum,
          weight: parseFloat(newEntry.weight), 
          height: parseFloat(newEntry.height),
          date: newEntry.date
        }
      ].sort((a, b) => a.day - b.day);
    }
    
    setGrowthData(updatedData);
    setNewEntry({ day: '', week: '', weight: '', height: '', date: '' });
    setError('');
    setActiveTab('chart');
  };

  // Chart dimensions
  const chartWidth = 800;
  const chartHeight = 400;
  const paddingX = 60;
  const paddingY = 40;
  const bottomPadding = 60;
  
  // Find max values for scaling
  const displayData = viewMode === 'week' ? weeklyData : growthData;
  
  const maxDay = viewMode === 'day' ? Math.max(...growthData.map(d => d.day), 294) : 0;
  const minDay = viewMode === 'day' ? Math.min(...growthData.map(d => d.day), 56) : 0;
  
  const maxWeek = viewMode === 'week' ? Math.max(...displayData.map(d => d.week), 42) : 0;
  const minWeek = viewMode === 'week' ? Math.min(...displayData.map(d => d.week), 8) : 0;
  
  const maxWeight = Math.max(...displayData.map(d => d.weight)) * 1.1;
  const maxHeight = Math.max(...displayData.map(d => d.height)) * 1.1;
  
  // Scale data points to chart dimensions
  const scaleX = (value) => {
    if (viewMode === 'day') {
      return paddingX + ((value - minDay) / (maxDay - minDay)) * (chartWidth - paddingX * 2);
    } else {
      return paddingX + ((value - minWeek) / (maxWeek - minWeek)) * (chartWidth - paddingX * 2);
    }
  };
  
  const scaleY = (value, metric) => {
    const maxValue = metric === 'weight' ? maxWeight : maxHeight;
    return chartHeight - paddingY - bottomPadding - (value / maxValue) * (chartHeight - paddingY * 2 - bottomPadding);
  };

  // Generate path data
  const generateLinePath = (data, metric) => {
    return data.map((point, i) => {
      const x = viewMode === 'day' ? scaleX(point.day) : scaleX(point.week);
      const y = scaleY(point[metric], metric);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Generate x-axis ticks based on view mode
  const generateXTicks = () => {
    if (viewMode === 'day') {
      // Generate ticks for days view (every 28 days / 4 weeks)
      const ticks = [];
      for (let day = 56; day <= 294; day += 28) {
        ticks.push(day);
      }
      return ticks;
    } else {
      // Generate ticks for weeks view (every 4 weeks)
      const ticks = [];
      for (let week = 8; week <= 42; week += 4) {
        ticks.push(week);
      }
      return ticks;
    }
  };

  // Filter data for table view
  const getTableData = () => {
    if (tableViewMode === 'week') {
      return weeklyData;
    } else {
      return growthData;
    }
  };

  return (
    <>
    <div className="p-4 bg-gray-50 rounded-lg max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Fetal Growth Tracker</h1>
      
      {/* Tab navigation */}
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
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4">
            <div>
              <span className="mr-2 text-sm font-medium text-gray-700">View by:</span>
              <button
                className={`px-3 py-1 rounded mr-2 ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setViewMode('week')}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 rounded ${viewMode === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setViewMode('day')}
              >
                Day
              </button>
            </div>
            
            <div>
              <button
                className={`px-3 py-1 rounded mr-2 ${activeMetric === 'weight' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveMetric('weight')}
              >
                Weight (g)
              </button>
              <button
                className={`px-3 py-1 rounded ${activeMetric === 'height' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveMetric('height')}
              >
                Length (cm)
              </button>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <svg width={chartWidth} height={chartHeight}>
              {/* Grid lines */}
              {generateXTicks().map(tick => (
                <line 
                  key={`grid-x-${tick}`}
                  x1={scaleX(tick)} 
                  y1={paddingY} 
                  x2={scaleX(tick)} 
                  y2={chartHeight - paddingY - bottomPadding} 
                  stroke="#eee" 
                  strokeWidth="1"
                />
              ))}
              
              {activeMetric === 'weight' ? 
                [0, Math.round(maxWeight / 4), Math.round(maxWeight / 2), Math.round(maxWeight * 3/4)].map(val => (
                  <line 
                    key={`grid-y-weight-${val}`}
                    x1={paddingX} 
                    y1={scaleY(val, 'weight')} 
                    x2={chartWidth - paddingX} 
                    y2={scaleY(val, 'weight')} 
                    stroke="#eee" 
                    strokeWidth="1"
                  />
                )) :
                [0, Math.round(maxHeight / 4), Math.round(maxHeight / 2), Math.round(maxHeight * 3/4)].map(val => (
                  <line 
                    key={`grid-y-height-${val}`}
                    x1={paddingX} 
                    y1={scaleY(val, 'height')} 
                    x2={chartWidth - paddingX} 
                    y2={scaleY(val, 'height')} 
                    stroke="#eee" 
                    strokeWidth="1"
                  />
                ))
              }
              
              {/* X and Y axes */}
              <line 
                x1={paddingX} 
                y1={chartHeight - paddingY - bottomPadding} 
                x2={chartWidth - paddingX} 
                y2={chartHeight - paddingY - bottomPadding} 
                stroke="#666" 
                strokeWidth="1"
              />
              <line 
                x1={paddingX} 
                y1={paddingY} 
                x2={paddingX} 
                y2={chartHeight - paddingY - bottomPadding} 
                stroke="#666" 
                strokeWidth="1"
              />
              
              {/* X axis labels */}
              {generateXTicks().map(tick => (
                <g key={`x-label-${tick}`}>
                  <line 
                    x1={scaleX(tick)} 
                    y1={chartHeight - paddingY - bottomPadding} 
                    x2={scaleX(tick)} 
                    y2={chartHeight - paddingY - bottomPadding + 5} 
                    stroke="#666" 
                  />
                  <text 
                    x={scaleX(tick)} 
                    y={chartHeight - paddingY - bottomPadding + 20} 
                    textAnchor="middle" 
                    fontSize="12"
                  >
                    {tick}
                  </text>
                </g>
              ))}
              <text 
                x={chartWidth / 2} 
                y={chartHeight - 15} 
                textAnchor="middle" 
                fontSize="14"
                fontWeight="bold"
              >
                {viewMode === 'day' ? 'Day of Pregnancy' : 'Week of Pregnancy'}
              </text>
              
              {/* Y axis labels */}
              {activeMetric === 'weight' ? 
                [0, Math.round(maxWeight / 4), Math.round(maxWeight / 2), Math.round(maxWeight * 3/4), Math.round(maxWeight)].map(val => (
                  <g key={`y-weight-${val}`}>
                    <line 
                      x1={paddingX - 5} 
                      y1={scaleY(val, 'weight')} 
                      x2={paddingX} 
                      y2={scaleY(val, 'weight')} 
                      stroke="#666" 
                    />
                    <text 
                      x={paddingX - 10} 
                      y={scaleY(val, 'weight') + 4} 
                      textAnchor="end" 
                      fontSize="12"
                    >
                      {val}
                    </text>
                  </g>
                )) :
                [0, Math.round(maxHeight / 4), Math.round(maxHeight / 2), Math.round(maxHeight * 3/4), Math.round(maxHeight)].map(val => (
                  <g key={`y-height-${val}`}>
                    <line 
                      x1={paddingX - 5} 
                      y1={scaleY(val, 'height')} 
                      x2={paddingX} 
                      y2={scaleY(val, 'height')} 
                      stroke="#666" 
                    />
                    <text 
                      x={paddingX - 10} 
                      y={scaleY(val, 'height') + 4} 
                      textAnchor="end" 
                      fontSize="12"
                    >
                      {val}
                    </text>
                  </g>
                ))
              }
              <text 
                x={20} 
                y={chartHeight / 2 - bottomPadding / 2} 
                textAnchor="middle" 
                transform={`rotate(-90, 20, ${chartHeight / 2 - bottomPadding / 2})`}
                fontSize="14"
                fontWeight="bold"
              >
                {activeMetric === 'weight' ? 'Weight (g)' : 'Length (cm)'}
              </text>
              
              {/* Data paths */}
              <path 
                d={generateLinePath(displayData, activeMetric)} 
                fill="none" 
                stroke={activeMetric === 'weight' ? "#3b82f6" : "#10b981"} 
                strokeWidth="2"
              />
              
              {/* Data points */}
              {displayData.map((point, i) => (
                <g key={`point-${i}`}>
                  <circle 
                    cx={viewMode === 'day' ? scaleX(point.day) : scaleX(point.week)} 
                    cy={scaleY(point[activeMetric], activeMetric)} 
                    r="5" 
                    fill={activeMetric === 'weight' ? "#3b82f6" : "#10b981"} 
                  />
                  {/* Tooltip on hover would be added here in a production app */}
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}
      
      {activeTab === 'update' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Update Growth Data</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day of Pregnancy
                </label>
                <input
                  type="number"
                  name="day"
                  value={newEntry.day}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="56"
                  max="294"
                  placeholder="56-294"
                />
                <p className="text-xs text-gray-500 mt-1">Day 56 = Week 8</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Week of Pregnancy
                </label>
                <input
                  type="number"
                  name="week"
                  value={newEntry.week}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="8"
                  max="42"
                  placeholder="8-42"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newEntry.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (grams)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={newEntry.weight}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  step="0.1"
                  min="0"
                  placeholder="e.g. 350"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Length (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={newEntry.height}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  step="0.1"
                  min="0"
                  placeholder="e.g. 25.5"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save Data
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-sm text-gray-600">
            <p>• Enter the day of pregnancy (56-294) or week (8-42)</p>
            <p>• Day and week values are linked (changing one updates the other)</p>
            <p>• Weight should be entered in grams</p>
            <p>• Length should be entered in centimeters</p>
            <p>• If you enter data for a day that already exists, it will update that entry</p>
          </div>
        </div>
      )}
      
      {activeTab === 'table' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-lg font-semibold">Growth Data</h2>
            <div>
              <span className="mr-2 text-sm font-medium text-gray-700">View by:</span>
              <button
                className={`px-3 py-1 rounded mr-2 ${tableViewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setTableViewMode('week')}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 rounded ${tableViewMode === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setTableViewMode('day')}
              >
                Day
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableViewMode === 'day' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (g)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length (cm)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getTableData().map((entry, i) => (
                  <tr key={`row-${i}`}>
                    {tableViewMode === 'day' && (
                      <td className="px-6 py-4 whitespace-nowrap">{entry.day}</td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">{entry.week}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(entry.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.weight.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.height.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
<Footer/>
    </>
  );
};

export default EnhancedFetalGrowthTracker;