import { useState } from 'react';
import usePagination from './hooks/usePagination';
import './App.css';

// Create a sample list of 123 items.
const items = Array.from({ length: 123 }, (_, index) => `Item ${index + 1}`);

function App() {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // All pagination logic comes from our custom hook.
  const {
    currentPage, totalPages, startIndex, endIndex, itemsOnCurrentPage,
    setPage, nextPage, prevPage, canNextPage, canPrevPage,
  } = usePagination({ totalItems: items.length, itemsPerPage });

  // slice() uses an exclusive ending index.
  const currentItems = items.slice(startIndex, endIndex);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <main className="pagination-container">
      <h1>Pagination Demo</h1>
      <div className="top-row">
        <label htmlFor="page-size">
          Items per page:{' '}
          <select
            id="page-size"
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.target.value));
              setPage(1); // Go back to the first page when the page size changes.
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
        <p>Total Items: {items.length}</p>
      </div>

      <ol start={startIndex + 1} className="item-list">
        {currentItems.map((item) => <li key={item}>{item}</li>)}
      </ol>

      <div className="navigation">
        <button onClick={prevPage} disabled={!canPrevPage}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={!canNextPage}>Next</button>
      </div>

      <p className="page-info">
        Showing items {items.length === 0 ? 0 : startIndex + 1} - {endIndex}
        {' '}(Total on this page: {itemsOnCurrentPage})
      </p>

      <div className="page-buttons" aria-label="Choose page">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={currentPage === number ? 'active' : ''}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
