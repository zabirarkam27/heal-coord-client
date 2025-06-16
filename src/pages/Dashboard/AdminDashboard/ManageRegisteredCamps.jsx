import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRegisteredCamps = () => {
  const [participants, setParticipants] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/participants")
      .then((res) => setParticipants(res.data))
      .catch((err) =>
        Swal.fire("Error", "Failed to load registered camps.", "error")
      );
  }, []);

  const handleConfirm = (id) => {
    axiosSecure
      .patch(`/participants/${id}`, {
        confirmationStatus: "Confirmed",
      })
      .then(() => {
        Swal.fire("Success", "Confirmation status updated!", "success");
        setParticipants((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, confirmationStatus: "Confirmed" } : p
          )
        );
      })
      .catch(() =>
        Swal.fire("Error", "Failed to update confirmation status.", "error")
      );
  };

  const handleCancel = (id, paymentStatus, confirmationStatus) => {
    if (paymentStatus === "Paid" && confirmationStatus === "Confirmed") return;

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/participants/${id}`)
          .then(() => {
            Swal.fire(
              "Cancelled!",
              "The registration has been removed.",
              "success"
            );
            setParticipants((prev) => prev.filter((p) => p._id !== id));
          })
          .catch(() =>
            Swal.fire("Error", "Failed to cancel registration.", "error")
          );
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Registered Camps</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>Camp Name</th>
              <th>Camp Fee</th>
              <th>Participant Name</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.campName}</td>
                <td>{p.fees} ৳</td>
                <td>{p.name}</td>
                <td className="px-4 py-2">
                  {p.paymentStatus === "Paid" ? "Paid" : "Unpaid"}
                </td>
                <td>
                  {p.confirmationStatus === "Pending" ? (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleConfirm(p._id)}
                      disabled={p.paymentStatus !== "Paid"}
                    >
                      Pending
                    </button>
                  ) : (
                    <span className="badge badge-success">Confirmed</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    disabled={
                      p.paymentStatus === "Paid" &&
                      p.confirmationStatus === "Confirmed"
                    }
                    onClick={() =>
                      handleCancel(p._id, p.paymentStatus, p.confirmationStatus)
                    }
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {participants.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No registered camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
