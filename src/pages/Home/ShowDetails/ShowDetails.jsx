import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import Swal from "sweetalert2";

const ShowDetails = () => {
  const { campId } = useParams();
  const { user } = useContext(AuthContext);

  const [camp, setCamp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    phone: "",
    gender: "",
    emergencyContact: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/camps/${campId}`)
      .then((res) => res.json())
      .then((data) => setCamp(data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load camp details!",
          footer: err.message,
        });
      });
  }, [campId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const participantData = {
      campId,
      campName: camp.title,
      fees: camp.fees,
      location: camp.location?.address,
      doctor: camp.doctors?.[0]?.name || "N/A",
      name: user?.displayName,
      email: user?.email,
      ...formData,
    };

    try {
      // Save participant
      await fetch("http://localhost:5000/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(participantData),
      });

      // Increment camp participant count
      await fetch(`http://localhost:5000/camps/${campId}/register`, {
        method: "PATCH",
      });

      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Thank you for registering for the camp.",
        confirmButtonColor: "#4b257d",
      });

      setShowModal(false);
      setFormData({ age: "", phone: "", gender: "", emergencyContact: "" });

      // refresh camp data
      const res = await fetch(`http://localhost:5000/camps/${campId}`);
      const updatedCamp = await res.json();
      setCamp(updatedCamp);
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Something went wrong. Please try again later.",
        footer: err.message,
      });
    }
  };

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
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#4b257d] text-white px-6 py-2 rounded hover:bg-[#3a1f62] transition duration-300"
          >
            Join Camp
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-[#4b257d]">
              Register for {camp.title}
            </h3>
            <div className="space-y-4">
              <input
                readOnly
                value={camp.title}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={camp.fees || "Free"}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={camp.location?.address}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={camp.doctors?.[0]?.name || "N/A"}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={user?.displayName}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={user?.email}
                className="input input-bordered w-full"
              />
              <input
                name="age"
                placeholder="Age"
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
              <select
                name="gender"
                onChange={handleInputChange}
                className="input input-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                name="emergencyContact"
                placeholder="Emergency Contact"
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
              <button
                onClick={handleRegister}
                className="bg-[#4b257d] text-white px-6 py-2 rounded hover:bg-[#3a1f62] transition duration-300 w-full"
              >
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
