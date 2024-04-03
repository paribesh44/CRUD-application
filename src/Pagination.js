import React from 'react';
import './Pagination.css'; // Import the CSS file for Pagination component

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div className="pagination-container">
      {currentPage > 1 && <button onClick={() => goToPage(currentPage - 1)}>Previous</button>}
      {pages.map(page => (
        <button key={page} onClick={() => goToPage(page)} className={currentPage === page ? 'active' : ''}>{page}</button>
      ))}
      {currentPage < totalPages && <button onClick={() => goToPage(currentPage + 1)}>Next</button>}
    </div>
  );
};

export default Pagination;
