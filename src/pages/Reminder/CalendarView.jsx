import { useEffect, useState } from "react";
import moment from "moment";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import Footer from "../../components/footer/Footer";
import NewEventModal from "./NewEventModal";
import DayDetailModal from "./DayDetailModal";

function CalendarView({ calendarEvents }) {
  const today = moment().startOf("day");
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  // State quản lý calendar và các modal
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf("month"));
  const [events, setEvents] = useState([]);
  const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));
  const [dayDetailOpen, setDayDetailOpen] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState({ title: "", events: [] });
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [selectedDateForNewEvent, setSelectedDateForNewEvent] = useState(null);

  // Load events từ localStorage, props, hoặc từ API
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else if (Array.isArray(calendarEvents)) {
      setEvents(calendarEvents);
    } else if (calendarEvents?.events && Array.isArray(calendarEvents.events)) {
      setEvents(calendarEvents.events);
    } else {
      setEvents([]);
    }
  }, [calendarEvents]);

  // Fetch events từ API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Reminder/all",
          { headers: { accept: "*/*" } }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else if (data?.events && Array.isArray(data.events)) {
          setEvents(data.events);
        }
      } catch (error) {
        console.error("Error fetching events from API:", error);
      }
    }
    fetchEvents();
  }, []);

  // Lưu events vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // Hàm xóa event thông qua API (sử dụng rid)
  const handleDeleteEvent = async (eventRid) => {
    if (!eventRid) {
      console.error("Event rid không hợp lệ:", eventRid);
      return;
    }
    try {
      const response = await fetch(
        `https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Reminder?rid=${eventRid}`,
        {
          method: "DELETE",
          headers: { accept: "text/plain" },
        }
      );
      const result = await response.text();
      console.log("Delete API response:", result);
      if (response.ok) {
        setEvents((prev) => prev.filter((event) => event.rid !== eventRid));
      } else {
        console.error("Không thể xóa event");
      }
    } catch (error) {
      console.error("Lỗi khi xóa event:", error);
    }
  };

  // Khi nhận event mới từ modal tạo, cập nhật lại state
  const handleNewEventSubmit = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setNewEventOpen(false);
  };

  // Lấy tất cả các ngày hiển thị trên calendar
  const allDaysInMonth = () => {
    let start = moment(firstDayOfMonth).startOf("week");
    let end = moment(firstDayOfMonth).endOf("month").endOf("week");
    const days = [];
    let day = start;
    while (day <= end) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }
    return days;
  };

  // Lấy tối đa 2 event để hiển thị tóm tắt cho mỗi ngày (sử dụng dateTime)
  const getEventsForCurrentDate = (date) => {
    const eventList = events || [];
    let filteredEvents = eventList.filter((e) =>
      moment(date).isSame(moment(e.dateTime), "day")
    );
    if (filteredEvents.length > 2) {
      const originalLength = filteredEvents.length;
      filteredEvents = filteredEvents.slice(0, 2);
      filteredEvents.push({ title: `${originalLength - 2} more`, theme: "MORE" });
    }
    return filteredEvents;
  };

  // Mở modal chi tiết của ngày và truyền các event của ngày đó
  const openDayDetail = (date) => {
    const filteredEvents = events.filter((e) =>
      moment(date).isSame(moment(e.dateTime), "day")
    );
    setSelectedDayData({
      title: moment(date).format("D MMM YYYY"),
      events: filteredEvents,
    });
    setDayDetailOpen(true);
  };

  // Mở modal tạo event mới, truyền ngày mặc định nếu có
  const handleAddNewEvent = (date) => {
    setSelectedDateForNewEvent(date);
    setNewEventOpen(true);
  };

  // Kiểm tra xem ngày có phải hôm nay không
  const isToday = (date) => moment(date).isSame(moment(), "day");
  // Kiểm tra xem ngày đó có thuộc tháng đang hiển thị hay không
  const isDifferentMonth = (date) =>
    moment(date).month() !== moment(firstDayOfMonth).month();

  // Các hàm điều hướng tháng
  const getPrevMonth = () => {
    const firstDayOfPrevMonth = moment(firstDayOfMonth).subtract(1, "M").startOf("month");
    setFirstDayOfMonth(firstDayOfPrevMonth);
    setCurrMonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
  };

  const getCurrentMonth = () => {
    const firstDayOfCurrMonth = moment().startOf("month");
    setFirstDayOfMonth(firstDayOfCurrMonth);
    setCurrMonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
  };

  const getNextMonth = () => {
    const firstDayOfNextMonth = moment(firstDayOfMonth).add(1, "M").startOf("month");
    setFirstDayOfMonth(firstDayOfNextMonth);
    setCurrMonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
  };

  return (
    <>
      <div className="w-full bg-white p-2 rounded-lg text-black shadow">
        {/* Header điều hướng tháng */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 sm:gap-4">
            <p className="font-semibold text-lg w-36">
              {moment(firstDayOfMonth).format("MMMM yyyy")}
            </p>
            <button className="btn btn-square btn-xs btn-ghost" onClick={getPrevMonth}>
              <ChevronLeftIcon className="w-4 h-4 text-black" />
            </button>
            <button className="btn btn-xs btn-ghost normal-case whitespace-nowrap" onClick={getCurrentMonth}>
              Current Month
            </button>
            <button className="btn btn-square btn-xs btn-ghost" onClick={getNextMonth}>
              <ChevronRightIcon className="w-4 h-4 text-black" />
            </button>
          </div>
          <div>
            <button
              className="btn btn-xs btn-ghost btn-outline normal-case"
              onClick={() => handleAddNewEvent(null)}
            >
              Add New Event
            </button>
          </div>
        </div>

        <div className="my-2 divider" />

        {/* Tiêu đề các ngày trong tuần */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 place-items-center">
          {weekdays.map((day, key) => (
            <div className="text-xs capitalize" key={key}>
              {day}
            </div>
          ))}
        </div>

        {/* Lưới calendar */}
        <div className="grid grid-cols-7 mt-1 place-items-stretch gap-2 sm:gap-4">
          {allDaysInMonth().map((day, idx) => (
            <div
              key={idx}
              className={`${colStartClasses[moment(day).get("day")]} border border-solid w-45 aspect-square flex flex-col p-1 relative`}
            >
              <p
                className={`inline-block self-start text-xs cursor-pointer px-1 rounded-full hover:bg-gray-200 ${
                  isToday(day)
                    ? "bg-blue-100 dark:bg-blue-400 dark:text-white"
                    : ""
                } ${isDifferentMonth(day) ? "text-gray-400" : "text-black"}`}
                onClick={() => openDayDetail(day)}
              >
                {moment(day).format("D")}
              </p>
              <div className="mt-1 flex flex-col space-y-1">
                {getEventsForCurrentDate(day).map((e, k) => {
                  const colors = [
                    "text-red-500",
                    "text-blue-500",
                    "text-green-500",
                    "text-yellow-500",
                    "text-purple-500",
                  ];
                  const color = colors[k % colors.length];
                  return (
                    <div
                      key={k}
                      onClick={() => e.theme === "MORE" && openDayDetail(day)}
                      className="flex justify-between items-center text-base bg-white text-black cursor-pointer p-1 rounded"
                    >
                      <span className={`font-bold truncate ${color}`}>
                        {e.title}
                      </span>
                      {e.dateTime && (
                        <span className="text-xs text-gray-600 ml-2">
                          {new Date(e.dateTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal chi tiết ngày với nút xóa event */}
      <DayDetailModal
        isOpen={dayDetailOpen}
        dayData={selectedDayData}
        onClose={() => setDayDetailOpen(false)}
        onDeleteEvent={handleDeleteEvent}
      />

      {/* Modal tạo event mới */}
      <NewEventModal
        isOpen={newEventOpen}
        defaultDate={selectedDateForNewEvent}
        onClose={() => setNewEventOpen(false)}
        onSubmit={handleNewEventSubmit}
      />

      <Footer />
    </>
  );
}

export default CalendarView;
