import { useCallback } from "react";
import { useDispatch } from 'react-redux';
import { setGuestsCount } from "src/store/features/reserve/reserveSlice";

export const useReserveGuestsCount = () => {
  
  const dispatch = useDispatch();

  const handleGuestsCountChange = useCallback((event) => {
    const value = event.target.value.replace(/\D/g, ""); // Remove non-digits
    dispatch(setGuestsCount(value));

    console.log("Guest count input changed: ", value);

  }, [dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e") {
      e.preventDefault();
    }
  };

  return {
    handleKeyDown,
    handleGuestsCountChange
  }
}