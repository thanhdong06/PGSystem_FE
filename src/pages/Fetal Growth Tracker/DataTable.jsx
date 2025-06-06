import { Button, Input, Tooltip } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { WarningOutlined } from "@ant-design/icons";

const DataTable = ({ growthData, weeklyData, fetchGrowthData, tableViewMode, setTableViewMode, warnings }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  const getTableData = () => {
    return tableViewMode === "week" ? weeklyData : growthData;
  };

  const handleEdit = (entry) => {
    setEditRowId(entry.measurementId);
    setEditData({
      week: entry.week,
      weight: entry.weight,
      height: entry.height,
    });
  };

  const handleSave = async (measurementId) => {
    try {
      const updatedEntry = {
        week: parseInt(editData.week),
        weightEstimate: parseFloat(editData.weight),
        length: parseFloat(editData.height),
      };

      if (
        isNaN(updatedEntry.week) ||
        isNaN(updatedEntry.weightEstimate) ||
        isNaN(updatedEntry.length)
      ) {
        toast.error("Please enter valid numbers for all fields");
        return;
      }

      await axiosInstance.put(`Fetus/Measurements?measurementId=${measurementId}`, updatedEntry);

      await fetchGrowthData();
      setEditRowId(null);
      toast.success("Measurement updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-lg font-semibold">Growth Data</h2>
        <div>
          <span className="mr-2 text-sm font-medium text-gray-700">View by:</span>
          <button
            className={`px-3 py-1 rounded mr-2 ${
              tableViewMode === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTableViewMode("week")}
          >
            Week
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Week
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight (g)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Height (cm)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getTableData().map((entry, i) => {
              const entryWarnings = warnings[entry.measurementId] || [];
              const weightWarning = entryWarnings.find((w) => w.toLowerCase().includes("trọng lượng"));
              const heightWarning = entryWarnings.find((w) => w.toLowerCase().includes("chiều dài"));

              return (
                <tr key={`row-${i}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editRowId === entry.measurementId ? (
                      <Input
                        name="week"
                        value={editData.week}
                        onChange={handleInputChange}
                        className="w-20"
                        type="number"
                        min="1"
                      />
                    ) : (
                      entry.week
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editRowId === entry.measurementId ? (
                      <Input
                        name="weight"
                        value={editData.weight}
                        onChange={handleInputChange}
                        className="w-20"
                        type="number"
                        step="0.1"
                        min="0"
                      />
                    ) : (
                      <span>
                        {entry.weight.toFixed(1)}
                        {weightWarning && (
                          <Tooltip title={weightWarning}>
                            {/* <WarningOutlined style={{ color: "orange", marginLeft: 8 }} /> */}
                          </Tooltip>
                        )}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editRowId === entry.measurementId ? (
                      <Input
                        name="height"
                        value={editData.height}
                        onChange={handleInputChange}
                        className="w-20"
                        type="number"
                        step="0.1"
                        min="0"
                      />
                    ) : (
                      <span>
                        {entry.height.toFixed(1)}
                        {heightWarning && (
                          <Tooltip title={heightWarning}>
                            {/* <WarningOutlined style={{ color: "orange", marginLeft: 8 }} /> */}
                          </Tooltip>
                        )}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editRowId === entry.measurementId ? (
                      <>
                        <Button
                          type="primary"
                          onClick={() => handleSave(entry.measurementId)}
                          className="mr-2"
                        >
                          Save
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                      </>
                    ) : (
                      <Button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEdit(entry)}
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;