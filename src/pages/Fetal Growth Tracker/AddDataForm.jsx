import React, { useState } from 'react';

const AddDataForm = ({ growthData, setGrowthData }) => {
  const [showForm, setShowForm] = useState(false);
  const [newDataPoint, setNewDataPoint] = useState({
    week: "",
    weight: "",
    height: ""
  });

  const handleDataSubmit = (e) => {
    e.preventDefault();
    const week = parseInt(newDataPoint.week);
    const day = week * 7;
    const dataPoint = {
      day: day,
      week: week,
      weight: parseFloat(newDataPoint.weight),
      height: parseFloat(newDataPoint.height)
    };
    const updatedData = [...growthData, dataPoint].sort((a, b) => a.day - b.day);
    setGrowthData(updatedData);
    setNewDataPoint({ week: "", weight: "", height: "" });
    setShowForm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
      >
        Add New Growth Data
      </button>
      {showForm && (
        <div className="mt-4 bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium mb-3">Enter New Growth Data</h3>
          <form onSubmit={handleDataSubmit}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Week</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newDataPoint.week}
                  onChange={(e) => setNewDataPoint({ ...newDataPoint, week: e.target.value })}
                  required
                  min="8"
                  max="42"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Weight (g)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newDataPoint.weight}
                  onChange={(e) => setNewDataPoint({ ...newDataPoint, weight: e.target.value })}
                  required
                  step="0.1"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Height (cm)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-md"
                value={newDataPoint.height}
                onChange={(e) => setNewDataPoint({ ...newDataPoint, height: e.target.value })}
                required
                step="0.1"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddDataForm;
