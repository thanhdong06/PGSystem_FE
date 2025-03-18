import { useState } from "react";
import moment from "moment";
import CalendarView from "./AddEventModal";
import AddEventModal from "./CalendarView";

function Calendar() {
  // Example initial events
  const [events, setEvents] = useState([
    {
      title: "Client Meeting",
      theme: "BLUE",
      startTime: moment().startOf("month").add(2, "days").toDate(),
      endTime: moment().startOf("month").add(2, "days").endOf("day").toDate(),
    },
    {
      title: "Product meeting",
      theme: "GREEN",
      startTime: moment().startOf("month").add(2, "days").toDate(),
      endTime: moment().startOf("month").add(2, "days").endOf("day").toDate(),
    },
    // ... more initial events ...
  ]);

  // Controls modal visibility
  const [showAddModal, setShowAddModal] = useState(false);
  // Optional: track which date the user clicked
  const [clickedDate, setClickedDate] = useState(null);

  // Handler for opening the modal
  const handleOpenModal = (day) => {
    // If you passed day from the calendar, store it
    if (day) setClickedDate(day);
    setShowAddModal(true);
  };

  // Handler for saving a new event
  const handleSaveEvent = ({ date, description }) => {
    const newEvent = {
      title: description,
      theme: "PINK", // or pick a theme from a dropdown
      startTime: moment(date).startOf("day").toDate(),
      endTime: moment(date).endOf("day").toDate(),
    };
    setEvents([...events, newEvent]);
    setShowAddModal(false);
  };

  // Example of opening a detail view (placeholder)
  const openDayDetail = ({ filteredEvents, title }) => {
    console.log("Open detail for day:", title, filteredEvents);
    // You can open a sidebar or modal here
  };

  return (
    <div className="p-4">
      {/* Our calendar component */}
      <CalendarView
        calendarEvents={events}
        addNewEvent={handleOpenModal} // calls the modal
        openDayDetail={openDayDetail}
      />

      {/* Conditionally render the modal */}
      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveEvent}
          defaultDate={clickedDate}
        />
      )}
    </div>
  );
}

export default Calendar;
