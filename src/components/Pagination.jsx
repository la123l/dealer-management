import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const goTo = (p) => {
    if (p >= 1 && p <= totalPages) onPageChange(p);
  };

  return (
    <div className="pagination">
      <button
        className="btn-outline"
        disabled={page === 1}
        onClick={() => goTo(page - 1)}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        className="btn-outline"
        disabled={page === totalPages}
        onClick={() => goTo(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
