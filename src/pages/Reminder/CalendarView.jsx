import { useEffect, useState } from "react";
import moment from "moment";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import CALENDAR_EVENT_STYLE from "./Until";
import Footer from "../../components/footer/Footer";
import NewEventModal from "./NewEventModal";
import DayDetailModal from "./DayDetailModal";

const THEME_BG = CALENDAR_EVENT_STYLE;

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

  // State cho hiển thị calendar
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf("month"));
  const [events, setEvents] = useState([]);
  const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));

  // State cho modal chi tiết ngày
  const [dayDetailOpen, setDayDetailOpen] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState({ title: "", events: [] });

  // State cho modal thêm sự kiện
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [selectedDateForNewEvent, setSelectedDateForNewEvent] = useState(null);

  // Khi component mount, load events từ localStorage (nếu có) hoặc từ props calendarEvents
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

  // Mỗi khi events thay đổi, lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // Lấy tất cả các ngày cần hiển thị trong calendar (bao gồm các ngày dư của tháng trước/sau)
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

  // Lấy tối đa 2 event cho mỗi ngày để hiển thị tóm tắt
  const getEventsForCurrentDate = (date) => {
    const eventList = events || [];
    let filteredEvents = eventList.filter((e) =>
      moment(date).isSame(moment(e.startTime), "day")
    );
    if (filteredEvents.length > 2) {
      const originalLength = filteredEvents.length;
      filteredEvents = filteredEvents.slice(0, 2);
      filteredEvents.push({ title: `${originalLength - 2} more`, theme: "MORE" });
    }
    return filteredEvents;
  };

  // Mở modal xem chi tiết các sự kiện trong một ngày
  const openDayDetail = (date) => {
    const filteredEvents = events.filter((e) =>
      moment(date).isSame(moment(e.startTime), "day")
    );
    setSelectedDayData({
      title: moment(date).format("D MMM YYYY"),
      events: filteredEvents,
    });
    setDayDetailOpen(true);
  };

  // Hàm mở modal thêm sự kiện, truyền vào ngày (nếu có)
  const handleAddNewEvent = (date) => {
    setSelectedDateForNewEvent(date);
    setNewEventOpen(true);
  };

  // Khi submit form thêm sự kiện, cập nhật state (và lưu vào localStorage qua useEffect)
  const handleNewEventSubmit = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setNewEventOpen(false);
  };

  // Kiểm tra xem ngày có phải hôm nay không
  const isToday = (date) => moment(date).isSame(moment(), "day");
  // Kiểm tra xem ngày đó có thuộc tháng đang hiển thị không (để làm mờ các ngày ngoài tháng)
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
            {/* Nút "Add New Event" khi không chọn ngày cụ thể */}
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

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 mt-1 place-items-stretch gap-2 sm:gap-4">
          {allDaysInMonth().map((day, idx) => (
            <div
              key={idx}
              className={`${colStartClasses[moment(day).get("day")]} border border-solid w-45 aspect-square flex flex-col p-1 relative`}
            >
              {/* Số ngày */}
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

              {/* Danh sách event tóm tắt (tối đa 2) */}
              <div className="mt-1 flex flex-col space-y-1">
                {getEventsForCurrentDate(day).map((e, k) => {
                  // Danh sách màu dùng để highlight chữ theo thứ tự cố định
                  const randomColors = [
                    "text-red-500",
                    "text-blue-500",
                    "text-green-500",
                    "text-yellow-500",
                    "text-purple-500",
                  ];
                  const randomColor = randomColors[k % randomColors.length];

                  return (
                    <div
                      key={k}
                      onClick={() => (e.theme === "MORE" ? openDayDetail(day) : null)}
                      className="flex justify-between items-center text-base bg-white text-black cursor-pointer p-1 rounded"
                    >
                      <span className={`font-bold truncate ${randomColor}`}>
                        {e.title}
                      </span>
                      {e.startTime && (
                        <span className="text-xs text-gray-600 ml-2">
                          {new Date(e.startTime).toLocaleTimeString([], {
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

      <DayDetailModal
        isOpen={dayDetailOpen}
        dayData={selectedDayData}
        onClose={() => setDayDetailOpen(false)}
      />

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
