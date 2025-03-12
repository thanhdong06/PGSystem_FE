import React, { useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import vietnameseNames from "./vietnameseNames";

const BabyNamesFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [filteredResults, setFilteredResults] = useState([]);
  const [popularity, setPopularity] = useState(0);
  const modalRef = useRef(null);

  // Function to search for names
  const searchNames = () => {
    const results = vietnameseNames.filter((baby) => {
      return (
        baby.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (genderFilter === "All" || baby.gender === genderFilter)
      );
    });

    setFilteredResults(results.slice(0, 10)); // Show top 10 results
    setPopularity(Math.min((results.length / 500) * 100, 100)); // Calculate popularity
    modalRef.current?.showModal(); // Open modal
  };

  return (
    <div className="bg-base-100 text-base-content mb-10">
      <div className="grid grid-cols-7 py-6 max-w-screen my-4">
        <div className="col-start-2 col-span-3">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-primary mb-6 text-center">
              Vietnamese Baby Name Finder
            </h1>

            {/* Search & Filter Section */}
            <div className="bg-base-200 rounded-lg p-8 shadow-md w-full max-w-lg">
              {/* Name Input */}
              <label className="block text-primary font-semibold mb-2">
                🔍 Enter a Name or Letter:
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full transition-all duration-200 focus:ring-2 focus:ring-accent"
                placeholder="Type a name..."
              />

              {/* Gender Filter */}
              <label className="block text-primary font-semibold mt-4 mb-2">
                🚻 Select Gender:
              </label>
              <select
                className="select select-bordered w-full transition-all duration-200 focus:ring-2 focus:ring-secondary"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Male">Boy</option>
                <option value="Female">Girl</option>
                <option value="Unisex">Unisex</option>
              </select>

              {/* Search Button */}
              <button
                className="btn btn-primary w-full mt-6"
                onClick={searchNames}
                disabled={!searchTerm.trim()}
              >
                Search
              </button>
            </div>
          </div>

          {/* Article Section */}
          <div className="mt-8 p-6 bg-base-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">
              📖 Understanding Vietnamese Names
            </h2>
            <p className="text-base-content mb-4">
              Vietnamese names are deeply rooted in tradition and often carry
              significant meanings that reflect virtues, nature, or family
              aspirations. Unlike Western names, Vietnamese names follow a
              unique pattern: **family name, middle name, given name**.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4">
              🔹 Family Names
            </h3>
            <p className="text-base-content">
              The most common Vietnamese surnames include **Nguyễn, Trần, Lê,
              Phạm, Hoàng**, and **Đinh**. The family name comes first,
              symbolizing the importance of ancestry and heritage.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4">
              🔹 Middle Names
            </h3>
            <p className="text-base-content">
              Middle names help distinguish family members and often express
              aspirations. Common middle names include **Thị (for females)** and
              **Văn (for males)**. Some carry deeper meanings like **Minh
              (bright, intelligent)** or **Bảo (precious, valuable)**.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4">
              🔹 Given Names
            </h3>
            <p className="text-base-content">
              The given name is the most personal and meaningful. It reflects
              **character, beauty, or family hopes**. Some are inspired by
              nature, like **Hải (sea)** or **Vân (cloud)**, while others show
              **strength**, such as **Dũng (bravery)** or **Khang
              (prosperity)**.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4">
              🔹 Choosing the Right Name
            </h3>
            <p className="text-base-content">
              Many parents consider **feng shui (phong thủy)**, astrology, and
              the **five elements (ngũ hành)** when naming their child. A name
              must harmonize with the birth year to bring **luck, health, and
              success**.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4">
              🎯 Popular Vietnamese Names & Their Meanings
            </h3>
            <ul className="list-disc list-inside text-base-content">
              <li>
                <strong>Anh</strong> - Bright, intelligent
              </li>
              <li>
                <strong>Bảo</strong> - Precious, treasure
              </li>
              <li>
                <strong>Cường</strong> - Strong, powerful
              </li>
              <li>
                <strong>Dương</strong> - Sun, ocean
              </li>
              <li>
                <strong>Hoa</strong> - Flower, beauty
              </li>
              <li>
                <strong>Linh</strong> - Soul, spiritual
              </li>
              <li>
                <strong>Minh</strong> - Intelligent, wise
              </li>
              <li>
                <strong>Ngọc</strong> - Jade, precious stone
              </li>
              <li>
                <strong>Quang</strong> - Light, radiance
              </li>
              <li>
                <strong>Tú</strong> - Elegant, outstanding
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />

      {/* Result Announcement Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">🔎 Name Search Results</h3>

          <div className="flex justify-center items-center mt-4">
            <div
              className="radial-progress text-primary"
              style={{
                "--value": popularity,
                "--size": "6rem",
                "--thickness": "8px",
              }}
              aria-valuenow={popularity}
              role="progressbar"
            >
              {popularity}%
            </div>
          </div>

          {filteredResults.length > 0 ? (
            <ul className="mt-4">
              {filteredResults.map((baby, index) => (
                <li key={index} className="p-2 border-b last:border-none">
                  <strong>{baby.name}</strong> ({baby.gender}) - {baby.meaning}
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-4 text-center text-gray-600">
              ❌ No matching names found.
            </p>
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

export default BabyNamesFinder;
