import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import usePagination from "../../../hooks/usePagination";

const ITEMS_PER_PAGE = 6;

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/camps")
      .then((res) => {
        setCamps(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch camps:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

    const {
    currentPage,
    setCurrentPage,
    pageCount,
    currentData,
    handlePageChange,
  } = usePagination(camps, ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this camp?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/delete-camp/${id}`);
        setCamps((prev) => prev.filter((camp) => camp._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Camp deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        const lastPage = Math.ceil((camps.length - 1) / ITEMS_PER_PAGE) - 1;
        if (currentPage > lastPage) {
          setCurrentPage(lastPage >= 0 ? lastPage : 0);
        }
      } catch (err) {
        console.error("Failed to delete camp:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete camp. Please try again.",
          icon: "error",
        });
      }
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
            {currentData.length > 0 ? (
              currentData.map((camp) => (
                <tr key={camp._id}>
                  <td>{camp.title}</td>
                  <td>
                    {camp.date && camp.time
                      ? `${camp.date} at ${camp.time}`
                      : "N/A"}
                  </td>
                  <td>{camp.location?.address || "N/A"}</td>
                  <td>
                    {camp.doctors && camp.doctors.length > 0
                      ? camp.doctors.length === 1
                        ? camp.doctors[0].name
                        : camp.doctors.map((doc) => doc.name).join(", ")
                      : "N/A"}
                  </td>
                  <td className="space-x-2">
                    <Link to={`/admin-dashboard/update-camp/${camp._id}`}>
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {camps.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-6">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
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

export default ManageCamps;
