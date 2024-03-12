import React, { createContext, useContext, useState, useMemo } from 'react'

const DataContext = createContext({
  isLoading: false,
  error: null,
});

export default function DataProvider({ children }) {
  const [authToken, setAuthToken] = useState(localStorage.getItem('jwtToken') || null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const globalContext = useMemo(() => ({
    isLoading,
    error,
    isOpen,
    setIsOpen,
    setIsLoading,
    setError,
    authToken,
    login: (token) => {
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
    },
    logout: () => {
      localStorage.removeItem('jwtToken');
      setAuthToken(null);
    }
  }), [isLoading, error, authToken]);


  return (
    <DataContext.Provider value={globalContext}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext);