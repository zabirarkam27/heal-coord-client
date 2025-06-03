import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all camps
  useEffect(() => {
    axios
      .get("http://localhost:5000/camps")
      .then((res) => {
        setCamps(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch camps:", err);
        setLoading(false);
      });
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this camp?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/delete-camp/${id}`);
      setCamps(camps.filter((camp) => camp._id !== id));
      alert("Camp deleted successfully!");
    } catch (err) {
      console.error("Failed to delete camp:", err);
      alert("Error deleting camp.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading camps...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Camps</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Healthcare Professional</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp) => (
              <tr key={camp._id}>
                <td>{camp.title}</td>
                <td>
                  {camp.date && camp.time
                    ? `${camp.date} at ${camp.time}`
                    : "N/A"}
                </td>

                <td> {camp.location?.address || "N/A"}</td>
                <td>
                  {camp.doctors && camp.doctors.length > 0
                    ? camp.doctors.length === 1
                      ? camp.doctors[0].name
                      : camp.doctors.map((doc) => doc.name).join(", ")
                    : "N/A"}
                </td>

                <td className="space-x-2">
                  <Link to={`/update-camp/${camp._id}`}>
                    <button className="btn btn-sm btn-outline btn-primary">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {camps.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamps;
