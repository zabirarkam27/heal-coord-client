import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthProvider";

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const [registeredCamps, setRegisteredCamps] = useState([]);

  useEffect(() => {
    const fetchRegisteredCamps = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/participants/email/${user.email}`
          );

        const participantList = res.data; 

        if (participantList.length > 0) {
          const campDataPromises = participantList.map(async (participant) => {
            const campRes = await axios.get(
              `http://localhost:5000/camps/${participant.campId}`
              );

            return {
              ...campRes.data,
              campId: participant.campId,
              participantName: participant.name,
              paymentStatus: participant.paymentStatus || "Unpaid",
              confirmationStatus: participant.confirmationStatus || "Pending",
            };
          });

          const allCamps = await Promise.all(campDataPromises);
          setRegisteredCamps(allCamps);
        } else {
          setRegisteredCamps([]);
        }
      } catch (error) {
        console.error("Error fetching multiple camps:", error);
      }
    };

    if (user?.email) fetchRegisteredCamps();
  }, [user?.email]);
  
   
  const handlePayment = async (camp) => {
    alert(`Redirecting to payment for ${camp.title}`);
  };

  const handleCancel = async (campId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this camp?"
    );
    if (!confirm) return;

    try {
      await axios.delete(
        `http://localhost:5000/participants/${user.email}/camps/${campId}`
      );
      setRegisteredCamps((prev) =>
        prev.filter((camp) => camp.campId !== campId)
      );
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  const handleFeedback = (campId) => {
    // Redirect or show modal for feedback
    alert(`Feedback for ${campId}`);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border px-4 py-2">Camp Name</th>
            <th className="border px-4 py-2">Camp Fees</th>
            <th className="border px-4 py-2">Participant Name</th>
            <th className="border px-4 py-2">Payment Status</th>
            <th className="border px-4 py-2">Confirmation Status</th>
            <th className="border px-4 py-2">Cancel</th>
            <th className="border px-4 py-2">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {registeredCamps.map((camp) => (
            <tr key={camp.campId} className="text-center">
              <td className="border px-4 py-2">{camp.title}</td>
              <td className="border px-4 py-2">${camp.fees}</td>
              <td className="border px-4 py-2">{user.displayName}</td>

              <td className="border px-4 py-2">
                {camp.paymentStatus === "Paid" ? (
                  "Paid"
                ) : (
                  <button
                    onClick={() => handlePayment(camp)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Pay
                  </button>
                )}
              </td>

              <td className="border px-4 py-2">{camp.confirmationStatus}</td>

              <td className="border px-4 py-2">
                <button
                  onClick={() => handleCancel(camp.campId)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded disabled:opacity-50"
                  disabled={camp.paymentStatus === "Paid"}
                >
                  Cancel
                </button>
              </td>

              <td className="border px-4 py-2">
                {camp.paymentStatus === "Paid" &&
                camp.confirmationStatus === "Confirmed" ? (
                  <button
                    onClick={() => handleFeedback(camp.campId)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Feedback
                  </button>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredCamps;
