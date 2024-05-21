import { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { setCheckInDate, setCheckOutDate, setGuestsCount } from "../../../store/features/reserve/reserveSlice";


export const useReserveDates = () => {
  const dispatch = useDispatch();
  const [selectedDays, setSelectedDays] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFindRooms, setIsFindRooms] = useState(false);
  const [isMinimumDays, setIsMinimumDays] = useState(false);

  const handleOpenCalendarForCheckIn = useCallback(() => {
    console.log("Opening calendar...");
    setShowCalendar(true);
    dispatch(setCheckInDate(null));
    dispatch(setCheckOutDate(null));
  }, [dispatch]);

  const handleOpenCalendarForCheckOut = useCallback((checkInDate) => {
    if (!checkInDate) {
      handleOpenCalendarForCheckIn();
    } else {
      setShowCalendar(true);
      dispatch(setCheckOutDate(null));
    }
  }, [dispatch, handleOpenCalendarForCheckIn]);

  const handleResetInDate = useCallback(() => {
    dispatch(setCheckInDate(null));
    dispatch(setCheckOutDate(null));
  }, [dispatch]);

  const handleResetOutDate = useCallback(() => {
    dispatch(setCheckOutDate(null));
  }, [dispatch]);

  const handleFilterSelected = useCallback((checkInDate, checkOutDate) => {

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const duration = endDate - startDate;
    const minDuration = 3 * 24 * 3600 * 1000; // 3 days in milliseconds
    if (duration < minDuration) {
      setIsMinimumDays(true);
      setIsFindRooms(false);
    } else {
      setSelectedDays(duration / (24 * 3600 * 1000));
      setIsFindRooms(true);
      setIsMinimumDays(false);
    }
  }, []);

  const handleGuestsCountChange = useCallback((event) => {
    const value = event.target.value.replace(/\D/g, ""); // Remove non-digits
    dispatch(setGuestsCount(value));
  }, [dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e") {
      e.preventDefault();
    }
  };
  return {
    selectedDays,
    showCalendar,
    setShowCalendar,
    isFindRooms,
    setIsFindRooms,
    isMinimumDays,
    handleOpenCalendarForCheckIn,
    handleOpenCalendarForCheckOut,
    handleFilterSelected,
    handleGuestsCountChange,
    handleResetInDate,
    handleResetOutDate,
    handleKeyDown
  };
}