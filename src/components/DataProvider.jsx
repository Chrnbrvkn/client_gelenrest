import React, { createContext, useContext, useState, useCallback } from 'react'
import { getHouses } from '../api/housesApi';


const DataContext = createContext()
export default function DataProvider({ children }) {

  const [houses, setHouses] = useState([])

  const fetchHouses = useCallback(async () => {
    try {
      const fetchedHouses = await getHouses();
      setHouses(fetchedHouses);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const globalContext = {
    houses,
    fetchHouses
  };

  return (
    <DataContext.Provider value={globalContext}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext);