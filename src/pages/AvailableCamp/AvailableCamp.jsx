import { useEffect, useState } from "react";
import AvailableCampCard from "./AvailableCampCard";

const AvailableCamp = () => {
  const [camps, setCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    fetch("http://localhost:5000/camps")
      .then((res) => res.json())
      .then((data) => setCamps(data))
      .catch((error) => console.error("Error fetching camps:", error));
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSort = (e) => setSortOption(e.target.value);
  const toggleLayout = () => setColumns(columns === 3 ? 2 : 3);

  const filteredCamps = camps
    .filter((camp) => {
      const keyword = searchTerm.toLowerCase();
      return (
        camp.title.toLowerCase().includes(keyword) ||
        camp.description.toLowerCase().includes(keyword) ||
        camp.date.includes(keyword)
      );
    })
    .sort((a, b) => {
      if (sortOption === "most-registered") {
        return b.registeredParticipants - a.registeredParticipants;
      } else if (sortOption === "fees") {
        return (a.fees || 0) - (b.fees || 0);
      } else if (sortOption === "alphabetical") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Medical Camps
      </h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search camps by keyword or date..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4b257d] focus:border-transparent transition duration-300 text-sm"
        />

        <select
          onChange={handleSort}
          value={sortOption}
          className="w-full md:w-1/4 px-2 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4b257d] focus:border-transparent transition duration-300"
        >
          <option className="text-sm" value="">
            Sort by
          </option>
          <option className="text-sm" value="most-registered">Most Registered</option>
          <option className="text-sm" value="fees">Camp Fees (Low to High)</option>
          <option className="text-sm mb-4" value="alphabetical">Alphabetical (Camp Name)</option>
        </select>

        <button
          onClick={toggleLayout}
          className="inline-block bg-[#4b257d] text-white px-4 py-2 rounded hover:bg-[#3a1f62] transition"
        >
          {columns === 3 ? "2-Column Layout" : "3-Column Layout"}
        </button>
      </div>

      {/* Camps */}
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
        {filteredCamps.map((camp) => (
          <AvailableCampCard key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCamp;
