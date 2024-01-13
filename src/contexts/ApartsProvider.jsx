import React, { createContext, useContext, useState } from 'react'
import { getAparts, getApartAllImages } from '../api/apartsApi';
import {useData} from './DataProvider';

const ApartsContext = createContext({
  aparts: [],
  apartPictures: [],
  fetchDataHouses: () => { },
});

export default function ApartsProvider({ children }) {
  const { setIsLoading, setError} = useData();

  const [aparts, setAparts] = useState([])
  const [apartPictures, setApartPictures] = useState([])

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


  const apartContext = {
    aparts,
    apartPictures,
    fetchDataAparts,
  };

  return (
    <ApartsContext.Provider value={apartContext}>
      {children}
    </ApartsContext.Provider>
  )
}

export const useApartsData  = () => useContext(ApartsContext);