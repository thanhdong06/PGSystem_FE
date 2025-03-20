import React, { useState, useEffect } from "react";
import moment from "moment";

function NewEventModal({ 
  isOpen, 
  defaultDate,  // Ngày mặc định (nếu người dùng bấm vào ô ngày)
  onClose, 
  onSubmit 
}) {
  // State quản lý form
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

  // Hàm gọi API tạo reminder
  const createReminder = async (newEvent) => {
    try {
      const response = await fetch(
        "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Reminder/Create",
        {
          method: "POST",
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0OCIsInVuaXF1ZV9uYW1lIjoiMDExMTIzMzM0NCIsInJvbGUiOiJNZW1iZXIiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NDI0NTA1MzgsImV4cCI6MTc0MjQ1MjMzOCwiaWF0IjoxNzQyNDUwNTM4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxMzUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.AQQvhCWFUrL1B8G18XLj5Cg8CvhLpX1Uyq94Xm0BCOo",
          },
          body: JSON.stringify(newEvent),
        }
      );
      const result = await response.text();
      console.log("API response:", result);
    } catch (error) {
      console.error("Error creating reminder:", error);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gộp date và time thành một chuỗi ISO
    const startTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm").toISOString();

    // Tạo object sự kiện mới
    const newEvent = {
      title,
      startTime,
      theme: "DEFAULT", 
      memberID: 1,          // Ví dụ, hoặc lấy từ auth context
      description: "null",  // Nếu cần
    };

    // Gọi API tạo reminder
    await createReminder(newEvent);

    // Gửi object sự kiện mới ra ngoài (cho component cha cập nhật state)
    onSubmit(newEvent);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setTitle("");
    setDate("");
    setTime("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Calender Remind</h2>
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
            <label className="block text-sm mb-1">Select date</label>
            <input
              type="date"
              className="w-full border rounded p-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Select time</label>
            <input
              type="time"
              className="w-full border rounded p-1"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="mr-2 text-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-500 text-white"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewEventModal;
