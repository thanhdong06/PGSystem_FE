import React, { useState, useEffect } from "react";
import moment from "moment";

function NewEventModal({ isOpen, defaultDate, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Set default date and time when modal opens
  useEffect(() => {
    if (isOpen && defaultDate) {
      setDate(moment(defaultDate).format("YYYY-MM-DD"));
      setTime("09:00");
    }
  }, [isOpen, defaultDate]);

  // API call to create a reminder
  const createReminder = async (newEvent) => {
    try {
      const response = await fetch(
        "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Reminder/Create",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0OCIsInVuaXF1ZV9uYW1lIjoiMDExMTIzMzM0NCIsInJvbGUiOiJNZW1iZXIiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NDI0NTA1MzgsImV4cCI6MTc0MjQ1MjMzOCwiaWF0IjoxNzQyNDUwNTM4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxMzUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.AQQvhCWFUrL1B8G18XLj5Cg8CvhLpX1Uyq94Xm0BCOo",
          },
          body: JSON.stringify(newEvent),
        }
      );
      const createdEvent = await response.json();
      console.log("Create API response:", createdEvent);
      return createdEvent;
    } catch (error) {
      console.error("Error creating reminder:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm").toISOString();

    const newEvent = {
      title,
      dateTime,
      theme: "DEFAULT",
      memberID: 1,
      description: "null",
    };

    const createdEvent = await createReminder(newEvent);
    if (createdEvent) {
      onSubmit(createdEvent);
    }
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDate("");
    setTime("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-lg shadow-xl w-96 transform transition-all duration-300 ease-in-out">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Calendar Reminder</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Event Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Time
            </label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={handleClose} 
              className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewEventModal;