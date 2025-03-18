import { useState } from "react";
import moment from "moment";

function AddEventModal({ onClose, onSave, defaultDate }) {
  // defaultDate can be passed in if user clicked a specific day. Otherwise, fallback to today.
  const [date, setDate] = useState(
    defaultDate ? moment(defaultDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
  );
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date, description });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow w-80">
        <h2 className="text-lg font-semibold mb-2">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded p-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              placeholder="e.g. Meeting with Alex"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-1 w-full"
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="btn btn-xs btn-ghost mr-2">
              Cancel
            </button>
            <button type="submit" className="btn btn-xs btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;
