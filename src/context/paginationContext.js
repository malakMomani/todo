import React, { useState } from 'react';

export const PaginationContext = React.createContext();

// make it a function component
function PaginationProvider({ children }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

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

export default PaginationProvider;