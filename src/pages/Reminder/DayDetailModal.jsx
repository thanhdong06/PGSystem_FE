import React from "react";
import { X, Clock, Trash2, Plus, CalendarIcon } from "lucide-react";
import moment from "moment";

function DayDetailModal({ isOpen, dayData, onClose, onDeleteEvent, onAddEvent }) {
  if (!isOpen) return null;

  // Format time from datetime string
  const formatEventTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    return dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get event category color
  const getEventColor = (event, index) => {
    const categoryColors = {
      "meeting": "bg-blue-50 text-blue-800 border-blue-300",
      "appointment": "bg-purple-50 text-purple-800 border-purple-300",
      "deadline": "bg-red-50 text-red-800 border-red-300",
      "reminder": "bg-yellow-50 text-yellow-800 border-yellow-300",
      "birthday": "bg-green-50 text-green-800 border-green-300"
    };
    
    // If event has a category property, use that to determine color
    if (event.category && categoryColors[event.category.toLowerCase()]) {
      return categoryColors[event.category.toLowerCase()];
    }
    
    // Default colors based on index
    const defaultColors = [
      "bg-blue-50 text-blue-800 border-blue-300",
      "bg-purple-50 text-purple-800 border-purple-300",
      "bg-green-50 text-green-800 border-green-300",
      "bg-yellow-50 text-yellow-800 border-yellow-300",
      "bg-red-50 text-red-800 border-red-300"
    ];
    
    return defaultColors[index % defaultColors.length];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <CalendarIcon className="h-6 w-6 text-white mr-2" />
            <h3 className="text-xl font-bold text-white">{dayData.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-white hover:bg-blue-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          {dayData.events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No events scheduled for this day</p>
              <button
                onClick={onAddEvent}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <h4 className="text-gray-700 font-medium">Events ({dayData.events.length})</h4>
                <button
                  onClick={onAddEvent}
                  className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </button>
              </div>
              
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {dayData.events.map((event, index) => (
                  <div 
                    key={event.rid || index} 
                    className={`py-3 px-4 mb-2 rounded-lg border ${getEventColor(event, index)}`}
                  >
                    <div className="flex justify-between mb-1">
                      <h5 className="font-semibold">{event.title}</h5>
                      <button
                        onClick={() => onDeleteEvent(event.rid)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Delete event"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {event.dateTime && (
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatEventTime(event.dateTime)}</span>
                      </div>
                    )}
                    
                    {event.description && (
                      <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                    )}
                    
                    {event.location && (
                      <div className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">Location:</span> {event.location}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayDetailModal;