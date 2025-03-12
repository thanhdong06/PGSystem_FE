import React, { useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const OvulationCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28); // Default cycle length is 28 days
  const [ovulationDate, setOvulationDate] = useState(null);
  const [fertileWindow, setFertileWindow] = useState(null);
  const modalRef = useRef(null); // Reference for modal

  // Calculate Ovulation & Fertile Window
  const calculateOvulation = () => {
    if (!startDate) return;

    const start = new Date(startDate);
    const ovulationDay = new Date(start);
    ovulationDay.setDate(start.getDate() + cycleLength - 14); // Ovulation occurs 14 days before next period

    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 5); // Fertile window starts 5 days before ovulation

    const fertileEnd = new Date(ovulationDay);
    fertileEnd.setDate(ovulationDay.getDate() + 1); // Fertile window ends 1 day after ovulation

    setOvulationDate(ovulationDay);
    setFertileWindow({ start: fertileStart, end: fertileEnd });

    modalRef.current?.showModal(); // Open modal
  };

  return (
    <div>

      <div className="grid grid-cols-7 py-6 max-w-screen my-4 mb-10">
        <div className="col-start-2 col-span-3">
          <div className="font-bold font-sans text-4xl text-base-content mb-6 text-center">
            Ovulation Calculator
          </div>

          {/* Selection & Calculation Box */}
          <div className="flex flex-col justify-center items-center gap-6 min-w-[650px] min-h-[150px] bg-transparent rounded-lg p-8 shadow-md">
            {/* Select Last Period Start Date */}
            <label className="w-11/12 text-base-content font-semibold">
              First Day of Your Last Period:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered w-11/12 transition-all duration-200 focus:ring-2 focus:ring-primary"
            />

            {/* Select Cycle Length */}
            <label className="w-11/12 text-base-content font-semibold">
              Average Cycle Length (Days):
            </label>
            <select
              className="select select-bordered w-11/12 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary"
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
            >
              {[...Array(20)].map((_, i) => {
                const length = 21 + i;
                return (
                  <option key={length} value={length}>
                    {length} Days
                  </option>
                );
              })}
            </select>

            {/* Calculate Button */}
            <button
              className="btn btn-primary w-11/12 transition-all duration-200"
              onClick={calculateOvulation}
              disabled={!startDate}
            >
              Calculate Ovulation Date
            </button>
          </div>
          {/* Explanation Section */}
          <div className="mt-8 p-6 bg-transparent rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-base-content mb-4">
              How does the ovulation calculator work?
            </h2>
            <p className="text-base-content mb-4">
              This calculator estimates your **ovulation date** and **fertile
              window** based on the first day of your last period and your
              typical cycle length. Here’s how it works:
            </p>
            <ul className="space-y-4">
              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🗓️ Ovulation Date
                </h3>
                <p className="text-base-content">
                  Ovulation usually happens **14 days before your next period**.
                  If your cycle length is **28 days**, you likely ovulate on
                  **day 14**. If your cycle is **30 days long**, ovulation
                  happens around **day 16**.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🕰️ Fertile Window
                </h3>
                <p className="text-base-content">
                  The **fertile window** is the best time to try for pregnancy.
                  It includes the **5 days before ovulation** (when sperm can
                  survive in the body) and **1 day after ovulation** (when the
                  egg is still viable).
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  📊 Accuracy
                </h3>
                <p className="text-base-content">
                  This calculator provides an **estimate** and works best if
                  your cycle is **regular**. If your periods are **irregular**,
                  tracking ovulation with **basal body temperature (BBT)** or
                  ovulation test kits may give more accurate results.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />

      {/* Ovulation Result Modal with DaisyUI Calendar */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ovulation & Fertile Window</h3>

          {ovulationDate && fertileWindow && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-center text-green-700 mb-4">
                Estimated Ovulation Date:{" "}
                {ovulationDate.toISOString().split("T")[0]}
              </h4>
              <h4 className="text-lg font-semibold text-center text-blue-600">
                Fertile Window:{" "}
                {fertileWindow.start.toISOString().split("T")[0]} -{" "}
                {fertileWindow.end.toISOString().split("T")[0]}
              </h4>

              {/* DaisyUI Calendar */}
              <div className="calendar bg-gray-200 p-4 rounded-lg mt-4">
                <div className="grid grid-cols-7 gap-1 text-center font-semibold">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div key={day} className="py-1">
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 42 }, (_, i) => {
                    const tempDate = new Date(ovulationDate);
                    tempDate.setDate(
                      tempDate.getDate() - (tempDate.getDay() + 1) + i
                    );

                    const formattedDate = tempDate.toISOString().split("T")[0];
                    const isFertile =
                      formattedDate >=
                        fertileWindow.start.toISOString().split("T")[0] &&
                      formattedDate <=
                        fertileWindow.end.toISOString().split("T")[0];
                    const isOvulation =
                      formattedDate ===
                      ovulationDate.toISOString().split("T")[0];

                    return (
                      <div
                        key={formattedDate}
                        className={`py-2 text-sm rounded-md ${
                          isOvulation
                            ? "bg-green-500 text-white"
                            : isFertile
                            ? "bg-blue-300"
                            : "bg-white"
                        }`}
                      >
                        {tempDate.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

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

export default OvulationCalculator;
