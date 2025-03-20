import React from "react";

function DayDetailModal({ isOpen, dayData, onClose }) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-4xl font-bold mb-4">{dayData.title}</h2>
        {dayData.events && dayData.events.length > 0 ? (
          <ul className="space-y-2">
            {dayData.events.map((ev, idx) => (
              <li
                key={idx}
                className="p-2 bg-blue-50 rounded border border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-2xl">{ev.title}</p>
                  {ev.startTime && (
                    <span className="text-xl text-gray-600 ml-2">
                      {new Date(ev.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl text-gray-500">Không có sự kiện nào.</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="px-3 py-1 rounded bg-blue-500 text-white text-xl"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayDetailModal;
