import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthProvider";

const ParticipantProfile = () => {
  const { user } = useContext(AuthContext);
  const [participant, setParticipant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/participants/email/${user.email}`
        );
        const profile = res.data?.[0];
        if (profile) {
          setParticipant(profile);
          setFormData(profile);
        }
      } catch (error) {
        console.error("Error fetching participant:", error);
      }
    };

    if (user.email) fetchParticipant();
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/participants/${participant._id}`,
        formData
      );
      if (res.data.modifiedCount || res.data.message) {
        alert("Profile updated successfully");
        setParticipant((prev) => ({ ...prev, ...formData }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!participant) {
    return (
      <div className="text-center mt-10">
        {/* <p className="text-lg font-semibold">Loading profile...</p> */}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Participant Profile</h2>

      {!isEditing ? (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {participant?.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {participant?.email || "N/A"}
          </p>
          <p>
            <strong>Age:</strong> {participant.age || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {participant.phone || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {participant.gender || "N/A"}
          </p>
          <p>
            <strong>Emergency Contact:</strong>{" "}
            {participant.emergencyContact || "N/A"}
          </p>

          <button
            className="btn btn-primary mt-4"
            onClick={() => setIsEditing(true)}
          >
            Update Profile
          </button>
        </div>
      ) : (
        <div className="form-control space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            placeholder="Name"
            className="input input-bordered"
            onChange={handleChange}
          />
          <input
            type="text"
            name="age"
            value={formData.age || ""}
            placeholder="Age"
            className="input input-bordered"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            placeholder="Phone"
            className="input input-bordered"
            onChange={handleChange}
          />
          <input
            type="text"
            name="gender"
            value={formData.gender || ""}
            placeholder="Gender"
            className="input input-bordered"
            onChange={handleChange}
          />
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact || ""}
            placeholder="Emergency Contact"
            className="input input-bordered"
            onChange={handleChange}
          />
          <div className="flex gap-2 mt-4">
            <button className="btn btn-success" onClick={handleUpdate}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setFormData(participant);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantProfile;
