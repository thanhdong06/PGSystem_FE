import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import BlogList from "../components/blog/BlogList";
import Footer from "../components/Footer/Footer";

const Test = () => {
  const [method, setMethod] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState(null);

  // Calculate Due Date
  const calculateDueDate = () => {
    let dueDate;
    switch (method) {
      case "Last Menstrual Period":
        dueDate = new Date(inputValue);
        dueDate.setDate(dueDate.getDate() + 280);
        break;
      case "Conception Date":
        dueDate = new Date(inputValue);
        dueDate.setDate(dueDate.getDate() + 266);
        break;
      case "IVF Transfer":
        let embryoAge = 5; // Default embryo age (can be customized)
        dueDate = new Date(inputValue);
        dueDate.setDate(dueDate.getDate() + (266 - embryoAge));
        break;
      case "Ultrasound":
        let gestationalAgeWeeks = parseInt(inputValue, 10);
        dueDate = new Date();
        dueDate.setDate(dueDate.getDate() - gestationalAgeWeeks * 7 + 280);
        break;
      default:
        return;
    }
    setDueDate(dueDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    document.getElementById("dueDateModal").showModal(); // Open modal
  };

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-7 py-6 max-w-screen my-4">
        <div className="col-start-2 col-span-3">
          <div className="font-bold font-sans text-4xl text-base-content mb-6 text-center">
            Due Date Calculator
          </div>

          {/* Selection & Calculation Box */}
          <div className="flex flex-col justify-center items-center gap-6 min-w-[650px] min-h-[150px] bg-gray-100 rounded-lg p-8 shadow-md">
            {/* Select Method */}
            <select
              className="select select-bordered w-11/12 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary"
              defaultValue=""
              onChange={(e) => {
                setMethod(e.target.value);
                setInputValue("");
                setDueDate(null);
              }}
            >
              <option disabled value="">
                Select a Calculation Method
              </option>
              <option value="Last Menstrual Period">
                Last Menstrual Period
              </option>
              <option value="Conception Date">Conception Date</option>
              <option value="IVF Transfer">IVF Transfer</option>
              <option value="Ultrasound">Ultrasound</option>
            </select>

            {/* Dynamic Input Field */}
            {method && (
              <input
                type={method === "Ultrasound" ? "number" : "date"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="input input-bordered w-11/12 transition-all duration-200 focus:ring-2 focus:ring-primary"
                placeholder={
                  method === "Ultrasound" ? "Enter weeks of pregnancy" : ""
                }
                min={method === "Ultrasound" ? "1" : undefined}
                max={method === "Ultrasound" ? "40" : undefined}
              />
            )}

            {/* Calculate Button */}
            <button
              className="btn btn-primary w-11/12 transition-all duration-200"
              onClick={calculateDueDate}
              disabled={!inputValue}
            >
              Calculate Due Date
            </button>
          </div>

          {/* Explanation Section */}
          <div className="mt-8 p-6 bg-transparent rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">
              How is the due date calculated?
            </h2>
            <p className="text-gray-600 mb-4">
              There are several ways to estimate your baby’s due date, and each
              method has its own approach. Here’s how they work and when they’re
              most useful.
            </p>
            <ul className="space-y-6">
              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  📅 Last Menstrual Period (LMP)
                </h3>
                <p className="text-gray-600">
                  This is the most common method doctors use. It assumes you
                  ovulate **about 14 days** after your last period starts. To
                  estimate your due date, just **add 280 days (40 weeks)** to
                  the first day of your last period. Simple, right? But keep in
                  mind, this works best if you have **regular cycles**. If your
                  periods are **irregular** or you don’t remember the exact
                  date, this might not be the most accurate method for you.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  🧬 Conception Date
                </h3>
                <p className="text-gray-600">
                  If you know **exactly when you conceived**, this method is
                  even more accurate than using your period. The due date is
                  calculated by **adding 266 days (38 weeks)** to the date of
                  conception. This works well if you’ve been tracking ovulation,
                  but if you’re not sure exactly when fertilization happened,
                  it’s harder to pinpoint.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  🍼 IVF (In Vitro Fertilization)
                </h3>
                <p className="text-gray-600">
                  If you’ve had **IVF (in vitro fertilization)**, your due date
                  can be calculated with **high precision**. The formula is
                  simple: **Take your embryo transfer date, add 266 days, then
                  subtract the age of your embryo** (usually **3 or 5 days** old
                  when transferred). Since everything is tracked in IVF, this
                  method is one of the most reliable.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  🩺 Ultrasound Scan
                </h3>
                <p className="text-gray-600">
                  If you’re unsure about your last period or conception date, an
                  **ultrasound scan** can help. Doctors measure your baby’s size
                  to estimate how far along you are, then calculate your due
                  date from there. **The earlier the scan, the more accurate it
                  is**. First-trimester ultrasounds are usually the best for
                  this. Later in pregnancy, babies grow at different rates,
                  making it harder to estimate an exact due date.
                </p>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <Footer />

      {/* Due Date Announcement */}
      <dialog id="dueDateModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Estimated Due Date</h3>
          <p className="py-4 text-lg text-center text-green-700">
            {dueDate ? dueDate : "No date calculated yet"}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Test;
