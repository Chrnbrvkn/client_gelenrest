import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { getAparts, getApartAllImages } from '../api/apartsApi';
import { getRoomAllImages, getAllRooms } from '../api/roomsApi'
import { getHouseAllImages, getHouses } from '../api/housesApi'
import { getBooking, getReservedDates, updateBooking } from '../api/bookingApi';

import { useData } from './DataProvider';

const ApiContext = createContext();

export default function ApiProvider({ children }) {

  const [authToken, setAuthToken] = useState(localStorage.getItem('jwtToken') || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reservedDates, setReservedDates] = useState([])
  const [booking, setBooking] = useState([])
  const [houses, setHouses] = useState([])
  const [housesPictures, setHousesPictures] = useState([])
  const [aparts, setAparts] = useState([])
  const [apartsPictures, setApartPictures] = useState([])
  const [rooms, setRooms] = useState([])
  const [roomsPictures, setRoomsPictures] = useState([])

  const fetchReservedDates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const bookingData = await getReservedDates();
      if (bookingData && JSON.stringify(bookingData) !== JSON.stringify(reservedDates)) {
        setReservedDates(bookingData);
      }
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchDataBooking = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const bookingData = await getBooking();
      if (bookingData && JSON.stringify(bookingData) !== JSON.stringify(reservedDates)) {
        setBooking(bookingData);
      }
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingData = async (id, updatedBooking) => {
    setIsLoading(true);
    try {
      await updateBooking(id, updatedBooking);
      fetchDataBooking();
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataHouses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const housesData = await getHouses();
      if (housesData && JSON.stringify(housesData) !== JSON.stringify(houses)) {
        // console.log(housesData);
        setHouses(housesData);
      }
      const pictures = await getHouseAllImages();
      setHousesPictures(pictures);
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataAparts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apartsData = await getAparts();
      if (apartsData && JSON.stringify(apartsData) !== JSON.stringify(aparts)) {
        // console.log(apartsData);
        setAparts(apartsData);
      }
      const pictures = await getApartAllImages();
      setApartPictures(pictures);
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchDataRooms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const roomsData = await getAllRooms();
      if (roomsData && JSON.stringify(roomsData) !== JSON.stringify(rooms)) {
        // console.log(roomsData);
        setRooms(roomsData);
      }
      const pictures = await getRoomAllImages();
      setRoomsPictures(pictures);
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token) => {
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setAuthToken(null);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchDataHouses()
  //     await fetchDataAparts()
  //     await fetchDataRooms()
  //   }
  //   fetchData()
  // }, [])

  const apiContextValue = useMemo(() => ({
    authToken,
    isLoading,
    error,
    isSubmitting,
    setIsLoading,
    setError,
    setIsSubmitting,
    login,
    logout,
    updateBookingData,
    houses,
    housesPictures,
    fetchDataHouses,
    aparts,
    apartsPictures,
    fetchDataAparts,
    rooms,
    roomsPictures,
    fetchDataRooms,
    reservedDates,
    fetchReservedDates,
    booking,
    fetchDataBooking
  }), [fetchReservedDates, reservedDates, houses, housesPictures, aparts, apartsPictures, rooms, roomsPictures, booking, fetchDataBooking]);


  return (
    <ApiContext.Provider value={apiContextValue}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApiData = () => useContext(ApiContext);