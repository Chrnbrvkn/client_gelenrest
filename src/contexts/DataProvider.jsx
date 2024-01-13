import React, { createContext, useContext, useState, useMemo } from 'react'

const DataContext = createContext({
  isLoading: false,
  error: null,
});

export default function DataProvider({ children }) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const globalContext = useMemo(() => ({
    isLoading,
    error,
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