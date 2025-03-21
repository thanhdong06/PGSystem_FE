import React from "react";

function DayDetailModal({ isOpen, dayData, onClose, onDeleteEvent }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="modal-box bg-white p-4 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">{dayData.title}</h2>
        <ul>
          {dayData.events.map((event) => (
            <li key={event.rid} className="flex justify-between items-center mb-2">
              <span>{event.title}</span>
              <button
                onClick={() => onDeleteEvent(event.rid)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayDetailModal;
