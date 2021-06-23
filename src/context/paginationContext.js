import React, { useState } from 'react';

export const PaginationContext = React.createContext();

// make it a function component
function PaginationContext({ children }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const state = {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage
  }

  return (
    <PaginationContext.Provider value={state}>
      {children}
    </PaginationContext.Provider>
  )
}

export default PaginationContext;