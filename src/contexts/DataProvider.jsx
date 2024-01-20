import React, { createContext, useContext, useState, useMemo } from 'react'

const DataContext = createContext({
  isLoading: false,
  error: null,
});

export default function DataProvider({ children }) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const globalContext = useMemo(() => ({
    isLoading,
    error,
    isOpen,
    setIsOpen,
    setIsLoading,
    setError
  }), [isLoading, error]);

  return (
    <DataContext.Provider value={globalContext}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext);