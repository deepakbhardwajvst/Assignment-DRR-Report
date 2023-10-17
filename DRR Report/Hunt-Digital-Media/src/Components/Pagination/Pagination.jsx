import React from "react";
import "./Pagination.css";

function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
