import { useState } from "react";

const usePagination = (data = [], itemsPerPage = 6) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate total pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Slice data for current page
  const currentData = data.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Handler for page change event (from ReactPaginate)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Reset page to first (optional)
  const resetPage = () => setCurrentPage(0);

  return {
    currentPage,
    setCurrentPage,
    pageCount,
    currentData,
    handlePageChange,
    resetPage,
  };
};

export default usePagination;
