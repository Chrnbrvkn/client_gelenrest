import React, { createContext, useContext, useState, useCallback } from 'react'
import { getHouses, getHouseAllImages } from '../api/housesApi';


const DataContext = createContext({
  isLoading: false,
  error: null,
  houses: [],
  housePictures: [],
  fetchDataHouses: () => { }
});

export default function DataProvider({ children }) {

  const [houses, setHouses] = useState([])
  const [housePictures, setHousePictures] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchDataHouses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const housesData = await getHouses();
      if (housesData) {
        setHouses(housesData);
      }
      const pictures = await getHouseAllImages();
      setHousePictures(pictures);
    } catch (e) {
      setError(e.message);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  

  const globalContext = {
    isLoading,
    error,
    houses,
    housePictures,
    fetchDataHouses
  };

  return (
    <DataContext.Provider value={globalContext}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext);