import { useEffect, useState } from "react";
import moment from "moment";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import Footer from "../../components/footer/Footer";
import NewEventModal from "./NewEventModal";
import DayDetailModal from "./DayDetailModal";

function CalendarView({ calendarEvents }) {
  const today = moment().startOf("day");
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",  
    "col-start-7",
  ];

  // State management for calendar and modals
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf("month"));
  const [events, setEvents] = useState([]);
  const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));
  const [dayDetailOpen, setDayDetailOpen] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState({ title: "", events: [] });
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [selectedDateForNewEvent, setSelectedDateForNewEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from localStorage, props, or API
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

  // Fetch events from API
  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Save events to localStorage whenever there's a change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // Function to delete event via API (using rid)
  const handleDeleteEvent = async (eventRid) => {
    if (!eventRid) {
      console.error("Invalid event rid:", eventRid);
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
      if (response.ok) {
        setEvents((prev) => prev.filter((event) => event.rid !== eventRid));
        // Show toast notification
        const toast = document.getElementById("toast-success");
        if (toast) {
          toast.classList.remove("hidden");
          setTimeout(() => toast.classList.add("hidden"), 3000);
        }
      } else {
        console.error("Could not delete event");
        // Show error toast
        const toast = document.getElementById("toast-error");
        if (toast) {
          toast.classList.remove("hidden");
          setTimeout(() => toast.classList.add("hidden"), 3000);
        }
      }
    } catch (error) {
      console.error("Error when deleting event:", error);
    }
  };

  // When receiving a new event from the create modal, update state
  const handleNewEventSubmit = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setNewEventOpen(false);
    // Show success toast
    const toast = document.getElementById("toast-success");
    if (toast) {
      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 3000);
    }
  };

  // Get all days displayed on the calendar
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

  // Get up to 3 events to display as summary for each day (using dateTime)
  const getEventsForCurrentDate = (date) => {
    const eventList = events || [];
    let filteredEvents = eventList.filter((e) =>
      moment(date).isSame(moment(e.dateTime), "day")
    );
    if (filteredEvents.length > 3) {
      const originalLength = filteredEvents.length;
      filteredEvents = filteredEvents.slice(0, 3);
      filteredEvents.push({ title: `+${originalLength - 3} more`, theme: "MORE" });
    }
    return filteredEvents;
  };

  // Open day detail modal and pass events for that day
  const openDayDetail = (date) => {
    const filteredEvents = events.filter((e) =>
      moment(date).isSame(moment(e.dateTime), "day")
    );
    setSelectedDayData({
      title: moment(date).format("dddd, MMMM D, YYYY"),
      date: date,
      events: filteredEvents,
    });
    setDayDetailOpen(true);
  };

  // Open new event modal, passing default date if available
  const handleAddNewEvent = (date) => {
    setSelectedDateForNewEvent(date);
    setNewEventOpen(true);
  };

  // Check if the day is today
  const isToday = (date) => moment(date).isSame(moment(), "day");
  // Check if the day belongs to the displayed month
  const isDifferentMonth = (date) =>
    moment(date).month() !== moment(firstDayOfMonth).month();

  // Month navigation functions
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

  // Get event category color
  const getEventColor = (event, index) => {
    const categoryColors = {
      "meeting": "bg-blue-100 text-blue-800 border-blue-200",
      "appointment": "bg-purple-100 text-purple-800 border-purple-200",
      "deadline": "bg-red-100 text-red-800 border-red-200",
      "reminder": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "birthday": "bg-green-100 text-green-800 border-green-200",
      "MORE": "bg-gray-100 text-gray-800 border-gray-200"
    };
    
    // If event has a category property, use that to determine color
    if (event.category && categoryColors[event.category.toLowerCase()]) {
      return categoryColors[event.category.toLowerCase()];
    }
    
    // If event has a theme property, use that
    if (event.theme && event.theme === "MORE") {
      return categoryColors["MORE"];
    }
    
    // Default colors based on index
    const defaultColors = [
      "bg-blue-100 text-blue-800 border-blue-200",
      "bg-purple-100 text-purple-800 border-purple-200",
      "bg-green-100 text-green-800 border-green-200",
      "bg-yellow-100 text-yellow-800 border-yellow-200",
      "bg-red-100 text-red-800 border-red-200"
    ];
    
    return defaultColors[index % defaultColors.length];
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Calendar Container */}
      <div className="w-full max-w-6xl mx-auto p-4 my-4 bg-white rounded-xl shadow-lg">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800 ml-2">
              {moment(firstDayOfMonth).format("MMMM YYYY")}
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={getPrevMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <button
              onClick={getCurrentMonth}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              Today
            </button>
            
            <button 
              onClick={getNextMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <button
            onClick={() => handleAddNewEvent(null)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Event
          </button>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* Calendar Grid */}
        {!isLoading && (
          <>
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-2">
              {weekdays.map((day, index) => (
                <div 
                  key={index} 
                  className="py-2 text-center text-sm font-medium text-gray-500"
                >
                  {day.slice(0, 3)}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 auto-rows-fr">
              {allDaysInMonth().map((day, idx) => (
                <div
                  key={idx}
                  className={`
                    ${colStartClasses[moment(day).get("day")]}
                    ${isDifferentMonth(day) ? 'bg-gray-50' : 'bg-white'} 
                    ${isToday(day) ? 'ring-2 ring-blue-500 ring-inset' : ''}
                    border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow min-h-24
                  `}
                >
                  {/* Day Header */}
                  <div className={`
                    px-2 py-1 flex justify-between items-center
                    ${isToday(day) ? 'bg-blue-500 text-white' : 
                      isDifferentMonth(day) ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-700'}
                  `}>
                    <span className="text-sm font-medium">
                      {moment(day).format("D")}
                    </span>
                    <button 
                      onClick={() => handleAddNewEvent(day)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-200 transition-all"
                      aria-label="Add event"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  
                  {/* Day Events */}
                  <div className="p-1 cursor-pointer" onClick={() => openDayDetail(day)}>
                    <div className="flex flex-col space-y-1 max-h-20 overflow-hidden">
                      {getEventsForCurrentDate(day).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`px-2 py-1 text-xs rounded border ${getEventColor(event, eventIndex)} truncate`}
                        >
                          {event.dateTime && (
                            <span className="inline-block mr-1 font-medium">
                              {new Date(event.dateTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          )}
                          <span className="truncate">{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Toast Notifications */}
      <div id="toast-success" className="hidden fixed bottom-4 right-4 flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow-lg" role="alert">
        <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div className="ml-3 text-sm font-normal">Action completed successfully!</div>
      </div>

      <div id="toast-error" className="hidden fixed bottom-4 right-4 flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow-lg" role="alert">
        <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div className="ml-3 text-sm font-normal">An error occurred. Please try again.</div>
      </div>

      {/* Day Detail Modal with delete event functionality */}
      <DayDetailModal
        isOpen={dayDetailOpen}
        dayData={selectedDayData}
        onClose={() => setDayDetailOpen(false)}
        onDeleteEvent={handleDeleteEvent}
        onAddEvent={() => {
          setDayDetailOpen(false);
          setSelectedDateForNewEvent(selectedDayData.date);
          setNewEventOpen(true);
        }}
      />

      {/* New Event Modal */}
      <NewEventModal
        isOpen={newEventOpen}
        defaultDate={selectedDateForNewEvent}
        onClose={() => setNewEventOpen(false)}
        onSubmit={handleNewEventSubmit}
      />

      <Footer />
    </div>
  );
}

export default CalendarView;