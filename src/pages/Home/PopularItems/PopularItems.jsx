import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopularItems = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/camps")
      .then((res) => res.json())
      .then((data) => {
        // Sort camps by registeredParticipants in descending order and select top 6
        const sortedCamps = data
          .sort((a, b) => b.registeredParticipants - a.registeredParticipants)
          .slice(0, 6);
        setCamps(sortedCamps);
      })
      .catch((error) => console.error("Error fetching camps:", error));
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Popular Medical Camps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={camp.imageUrl}
              alt={camp.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{camp.title}</h3>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {camp.date}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Time:</strong> {camp.time}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Location:</strong> {camp.location.address}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Organizer:</strong> {camp.organizer.name}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Doctor:</strong> {camp.doctors[0]?.name || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Camp Fees:</strong> {camp.fees || "Free"}
              </p>
              <p className="text-gray-600">
                <strong>Participants:</strong> {camp.registeredParticipants}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/available-camps"
          className="inline-block bg-[#4b257d] text-white px-6 py-3 rounded-full hover:bg-[#3a1f62] transition-colors duration-300"
        >
          See All Camps
        </Link>
      </div>
    </div>
  );
};

export default PopularItems;
