import { createContext, useCallback, useContext, useMemo, useState } from "react";


const ModalsContext = createContext();

export default function ModalsProvider({ children }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestsCount, setGuestsCount] = useState(null);

  const [callbackModal, setCallbackModal] = useState({ isOpen: false });
  const [bookingModal, setBookingModal] = useState({ isOpen: false, selectedItem: null });

  const openCallbackModal = useCallback(() => {
    setCallbackModal({ isOpen: true });
  }, []);

  const closeCallbackModal = useCallback(() => {
    setCallbackModal({ isOpen: false });
  }, []);

  const openBookingModal = useCallback((item) => {
    setBookingModal({ isOpen: true, selectedItem: item });
  }, []);

  const closeBookingModal = useCallback(() => {
    setBookingModal({ isOpen: false, selectedItem: null });
  }, []);

  const contextValue = useMemo(() => ({
    callbackModal,
    bookingModal,
    openCallbackModal,
    closeCallbackModal,
    openBookingModal,
    closeBookingModal,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guestsCount,
    setGuestsCount
  }), [callbackModal, bookingModal, checkInDate, checkOutDate,guestsCount]);

  return (
    <ModalsContext.Provider value={contextValue}>
      {children}
    </ModalsContext.Provider>
  );
}

export const useModals = () => useContext(ModalsContext);