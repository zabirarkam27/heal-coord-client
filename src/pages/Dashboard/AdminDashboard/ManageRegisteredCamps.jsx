import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 6;

const ManageRegisteredCamps = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/participants")
      .then((res) => {
        setParticipants(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load registered camps.", "error");
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleConfirm = async (id) => {
    try {
      await axiosSecure.patch(`/participants/${id}`, {
        confirmationStatus: "Confirmed",
      });
      Swal.fire("Success", "Confirmation status updated!", "success");
      setParticipants((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, confirmationStatus: "Confirmed" } : p
        )
      );
    } catch {
      Swal.fire("Error", "Failed to update confirmation status.", "error");
    }
  };

  const handleCancel = (id, paymentStatus, confirmationStatus) => {
    if (paymentStatus === "Paid" && confirmationStatus === "Confirmed") return;

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/participants/${id}`);
          Swal.fire(
            "Cancelled!",
            "The registration has been removed.",
            "success"
          );
          setParticipants((prev) => prev.filter((p) => p._id !== id));

          // Adjust currentPage if needed
          const newTotal = participants.length - 1;
          const newPageCount = Math.ceil(newTotal / ITEMS_PER_PAGE);
          if (currentPage >= newPageCount && currentPage > 0) {
            setCurrentPage(newPageCount - 1);
          }
        } catch {
          Swal.fire("Error", "Failed to cancel registration.", "error");
        }
      }
    });
  };

  // Pagination calculations
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = participants.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(participants.length / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

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
            {currentItems.length > 0 ? (
              currentItems.map((p, index) => (
                <tr key={p._id}>
                  <td>{offset + index + 1}</td>
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
                        handleCancel(
                          p._id,
                          p.paymentStatus,
                          p.confirmationStatus
                        )
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No registered camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {participants.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-6">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex gap-2"}
            pageLinkClassName={
              "px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
            }
            previousLinkClassName={
              "px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
            }
            nextLinkClassName={
              "px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
            }
            activeLinkClassName={"bg-blue-500 text-white"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
            breakLabel={"..."}
            breakClassName={"px-2"}
            forcePage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ManageRegisteredCamps;
