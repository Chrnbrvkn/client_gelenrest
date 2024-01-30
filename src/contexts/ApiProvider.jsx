import React, { createContext, useContext, useState } from 'react'
import { getAparts, getApartAllImages } from '../api/apartsApi';
import { useData } from './DataProvider';

const ApiContext = createContext({
  booking: [],
  fetchDataBooking: () => { },
  houses: [],
  housesPictures: [],
  fetchDataHouses: () => { },
  aparts: [],
  apartPictures: [],
  fetchDataAparts: () => { },
  rooms: [],
  roomsPictures: [],
  fetchDataRooms: () => {}
});

export default function ApiProvider({ children }) {
  const { setIsLoading, setError } = useData();

  const [aparts, setAparts] = useState([])
  const [apartPictures, setApartPictures] = useState([])
  const [houses, setHouses] = useState([])
  const [housePictures, setHousePictures] = useState([])
  const [rooms, setRooms] = useState([])
  const [roomPictures, setRoomPictures] = useState([])

  const fetchDataAparts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apartsData = await getAparts();
      if (apartsData && JSON.stringify(apartsData) !== JSON.stringify(aparts)) {
        setAparts(apartsData);
      }
      const pictures = await getApartAllImages();
      setApartPictures(pictures);
    } catch (e) {
      setError(e.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  const apiContext = {
    aparts,
    apartPictures,
    fetchDataAparts,
  };

  return (
    <ApiProvider.Provider value={apiContext}>
      {children}
    </ApiProvider.Provider>
  )
}

export const useApartsData = () => useContext(ApiContext);