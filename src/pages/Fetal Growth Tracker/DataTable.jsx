// DataTable.jsx
import React from 'react';

const DataTable = ({ growthData, weeklyData, tableViewMode, setTableViewMode }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTableData = () => {
    if (tableViewMode === 'week') {
      return weeklyData;
    } else {
      return growthData;
    }
  };

  return (
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height (cm)</th>
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
  );
};

export default DataTable;
