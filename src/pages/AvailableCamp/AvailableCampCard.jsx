import { Link } from "react-router-dom";

const AvailableCampCard = ({ camp }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <img
        src={camp.imageUrl}
        alt={camp.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{camp.title}</h3>
        <p className="text-gray-600 mb-1">
          <strong>Date:</strong> {camp.date}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Time:</strong> {camp.time}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Location:</strong> {camp.location?.address}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Doctor:</strong> {camp.doctors?.[0]?.name || "N/A"}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Participants:</strong> {camp.registeredParticipants}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Fees:</strong> {camp.fees || "Free"}
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Description:</strong> {camp.description?.slice(0, 80)}...
        </p>

        {/* Spacer div to push the button down if needed */}
        <div className="flex-grow"></div>

        <Link
          to={`/camp-details/${camp._id}`}
          className="inline-block bg-[#4b257d] text-white text-center px-4 py-2 rounded hover:bg-[#3a1f62] transition mt-auto"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default AvailableCampCard;
