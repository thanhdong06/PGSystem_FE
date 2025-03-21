import React, { useState, useEffect } from "react";
import moment from "moment";

function NewEventModal({ isOpen, defaultDate, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Khi modal mở, nếu có defaultDate thì set sẵn giá trị cho date và time
  useEffect(() => {
    if (isOpen && defaultDate) {
      setDate(moment(defaultDate).format("YYYY-MM-DD"));
      setTime("09:00");
    }
  }, [isOpen, defaultDate]);

  // Hàm gọi API tạo reminder và trả về event được tạo từ backend
  const createReminder = async (newEvent) => {
    try {
      const response = await fetch(
        "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Reminder/Create",
        {
          method: "POST",
          headers: {
            accept: "application/json", // Yêu cầu nhận về JSON
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0OCIsInVuaXF1ZV9uYW1lIjoiMDExMTIzMzM0NCIsInJvbGUiOiJNZW1iZXIiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NDI0NTA1MzgsImV4cCI6MTc0MjQ1MjMzOCwiaWF0IjoxNzQyNDUwNTM4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxMzUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.AQQvhCWFUrL1B8G18XLj5Cg8CvhLpX1Uyq94Xm0BCOo",
          },
          body: JSON.stringify(newEvent),
        }
      );
      // Giả sử API trả về dữ liệu event dưới dạng JSON, bao gồm thuộc tính "rid"
      const createdEvent = await response.json();
      console.log("Create API response:", createdEvent);
      return createdEvent;
    } catch (error) {
      console.error("Error creating reminder:", error);
      return null;
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gộp date và time thành ISO string cho thuộc tính dateTime
    const dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm").toISOString();

    const newEvent = {
      title,
      dateTime,
      theme: "DEFAULT",
      memberID: 1,
      description: "null",
    };

    // Gọi API tạo reminder và nhận lại event từ backend
    const createdEvent = await createReminder(newEvent);
    if (createdEvent) {
      // Cập nhật event mới với thông tin từ backend (có rid hợp lệ)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Calendar Reminder</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm mb-1">Event Name</label>
            <input
              type="text"
              className="w-full border rounded p-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Select Date</label>
            <input
              type="date"
              className="w-full border rounded p-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Select Time</label>
            <input
              type="time"
              className="w-full border rounded p-1"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={handleClose} className="mr-2 text-red-500">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewEventModal;
