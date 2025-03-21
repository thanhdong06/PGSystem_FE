// UpdateData.jsx
import React, { useState } from 'react';

const UpdateData = ({ growthData, setGrowthData, setActiveTab }) => {
  const [newEntry, setNewEntry] = useState({
    day: '',
    week: '',
    weight: '',
    height: '',
    date: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'day') {
      const weekValue = Math.floor(parseInt(value) / 7);
      setNewEntry({
        ...newEntry,
        [name]: value,
        week: weekValue || ''
      });
    } else if (name === 'week') {
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

    // Kiểm tra nếu ngày đã tồn tại
    const existingIndex = growthData.findIndex(item => item.day === dayNum);
    let updatedData;
    if (existingIndex >= 0) {
      updatedData = growthData.map((item, index) =>
        index === existingIndex
          ? {
              ...item,
              weight: parseFloat(newEntry.weight),
              height: parseFloat(newEntry.height),
              date: newEntry.date
            }
          : item
      );
    } else {
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

  return (
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
              Height (cm)
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
        <p>• Enter the day of pregnancy (56-294)</p>
        <p>• Day and week values are linked (changing one updates the other)</p>
        <p>• Weight should be entered in grams</p>
        <p>• Length should be entered in centimeters</p>
        <p>• If you enter data for a day that already exists, it will update that entry</p>
      </div>
    </div>
  );
};

export default UpdateData;

