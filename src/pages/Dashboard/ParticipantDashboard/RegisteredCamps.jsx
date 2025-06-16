import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 6;

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const [registeredCamps, setRegisteredCamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchRegisteredCamps = async () => {
      try {
        const res = await axiosSecure.get(`/participants/email/${user.email}`);
        const participantList = res.data;

        if (participantList.length > 0) {
          const campDataPromises = participantList.map(async (participant) => {
            const campRes = await axiosSecure.get(
              `/camps/${participant.campId}`
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
        Swal.fire("Error", "Failed to load registered camps", "error");
        console.error("Error fetching multiple camps:", error);
      }
    };

    if (user?.email) fetchRegisteredCamps();
  }, [user?.email, axiosSecure]);

  const handlePayment = (camp) => {
    Swal.fire({
      title: "Payment Redirect",
      text: `Redirecting to payment for ${camp.title}`,
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    });
    // Implement actual redirect/payment logic here
  };

  const handleCancel = async (campId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this camp registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/participants/${user.email}/camps/${campId}`);
      setRegisteredCamps((prev) =>
        prev.filter((camp) => camp.campId !== campId)
      );

      // Adjust pagination if current page becomes invalid after deletion
      const newTotal = registeredCamps.length - 1;
      const newPageCount = Math.ceil(newTotal / ITEMS_PER_PAGE);
      if (currentPage >= newPageCount && currentPage > 0) {
        setCurrentPage(newPageCount - 1);
      }

      Swal.fire(
        "Cancelled!",
        "Your registration has been cancelled.",
        "success"
      );
    } catch (err) {
      Swal.fire("Error", "Failed to cancel registration.", "error");
      console.error("Cancel failed:", err);
    }
  };

  const handleFeedback = (campId) => {
    Swal.fire({
      title: "Feedback",
      text: `Feedback for camp ID: ${campId}`,
      icon: "info",
    });
    // Implement feedback modal or redirect here
  };

  // Pagination
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = registeredCamps.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(registeredCamps.length / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
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
          {currentItems.length > 0 ? (
            currentItems.map((camp) => (
              <tr key={camp.campId} className="text-center">
                <td className="border px-4 py-2">{camp.title}</td>
                <td className="border px-4 py-2">${camp.fees}</td>
                <td className="border px-4 py-2">
                  {camp.participantName || user.displayName}
                </td>

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

      {/* Pagination */}
      {registeredCamps.length > ITEMS_PER_PAGE && (
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

export default RegisteredCamps;
