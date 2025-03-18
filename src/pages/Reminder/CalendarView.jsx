import { useEffect, useState } from "react";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";
import CALENDAR_EVENT_STYLE from "./Until";
import Footer from "../../components/footer/Footer";

const THEME_BG = CALENDAR_EVENT_STYLE;

function CalendarView({ calendarEvents, addNewEvent, openDayDetail }) {
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

  const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf("month"));
  const [events, setEvents] = useState([]);
  const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));

  useEffect(() => {
    setEvents(calendarEvents);
  }, [calendarEvents]);

  // Tạo danh sách các ngày hiển thị (bao gồm cả những ngày của tháng trước & sau để đủ lưới)
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

  // Lấy tối đa 2 event cho mỗi ngày
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

  // Khi người dùng click vào "X more", mở chi tiết tất cả event
  const openAllEventsDetail = (date, theme) => {
    if (theme !== "MORE") return;
    const filteredEvents = events
      .filter((e) => moment(date).isSame(moment(e.startTime), "day"))
      .map((e) => ({ title: e.title, theme: e.theme }));
    openDayDetail({ filteredEvents, title: moment(date).format("D MMM YYYY") });
  };

  // Kiểm tra xem ngày hiện tại có phải ngày hôm nay không
  const isToday = (date) => moment(date).isSame(moment(), "day");
  const isDifferentMonth = (date) =>
    moment(date).month() !== moment(firstDayOfMonth).month();

  // Điều hướng tháng
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
        {/* Điều hướng header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 sm:gap-4">
            <p className="font-semibold text-lg w-36">
              {moment(firstDayOfMonth).format("MMMM yyyy")}
            </p>
            <button className="btn btn-square btn-xs btn-ghost" onClick={getPrevMonth}>
              <ChevronLeftIcon className="w-4 h-4 text-black" />
            </button>
            <button
              className="btn btn-xs btn-ghost normal-case whitespace-nowrap"
              onClick={getCurrentMonth}
            >
              Current Month
            </button>
            <button className="btn btn-square btn-xs btn-ghost" onClick={getNextMonth}>
              <ChevronRightIcon className="w-4 h-4 text-black" />
            </button>
          </div>
          <div>
            <button
              className="btn btn-xs btn-ghost btn-outline normal-case"
              onClick={() => addNewEvent()}
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

        {/* Các ô ngày (ô vuông nhỏ) */}
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
                onClick={() => addNewEvent(day)}
              >
                {moment(day).format("D")}
              </p>

              {/* Các event của ngày */}
              <div className="mt-1 flex flex-col space-y-1">
                {getEventsForCurrentDate(day).map((e, k) => (
                  <p
                    key={k}
                    onClick={() => openAllEventsDetail(day, e.theme)}
                    className={`text-xs truncate bg-white text-black cursor-pointer ${
                      THEME_BG[e.theme] || ""
                    }`}
                  >
                    {e.title}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CalendarView;
