import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDetails = () => {
  const { campId } = useParams();
  const [camp, setCamp] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/camps/${campId}`)
      .then((res) => res.json())
      .then((data) => setCamp(data))
      .catch((err) => console.error("Failed to load camp details:", err));
  }, [campId]);

  if (!camp) {
    return <div className="text-center py-10">Loading camp details...</div>;
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={camp.imageUrl}
          alt={camp.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-[#4b257d]">
            {camp.title}
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Camp Fees:</strong> {camp.fees || "Free"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Date & Time:</strong> {camp.date} at {camp.time}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Location:</strong> {camp.location?.address}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Healthcare Professional:</strong>{" "}
            {camp.doctors?.[0]?.name || "N/A"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Participants:</strong> {camp.registeredParticipants}
          </p>
          <p className="text-gray-700 mt-4 mb-6">
            <strong>Description:</strong> <br />
            {camp.description}
          </p>
          <button className="bg-[#4b257d] text-white px-6 py-2 rounded hover:bg-[#3a1f62] transition duration-300">
            Join Camp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
