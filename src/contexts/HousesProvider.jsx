import React, { createContext, useContext, useState } from 'react'
import { getHouses, getHouseAllImages } from '../api/housesApi';
import { useData } from './DataProvider';

const HousesContext = createContext({
  houses: [],
  housesPictures: [],
  fetchDataHouses: () => { },
});

export default function HousesProvider({ children }) {
  const { setIsLoading, setError} = useData();

  const [houses, setHouses] = useState([])
  const [housePictures, setHousePictures] = useState([])

  const fetchDataHouses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const housesData = await getHouses();
      if (housesData && JSON.stringify(housesData) !== JSON.stringify(houses)) {
        setHouses(housesData);
      }
      const pictures = await getHouseAllImages();
      setHousePictures(pictures);
    } catch (e) {
      setError(e.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  const apartContext = {
    houses,
    housePictures,
    fetchDataHouses,
  };

  return (
    <HousesContext.Provider value={apartContext}>
      {children}
    </HousesContext.Provider>
  )
}

export const useHousesData = () => useContext(HousesContext);