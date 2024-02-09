import { createContext, useCallback, useContext, useMemo, useState } from "react";


const BookingContext = createContext()

export default function BookingProvider({ children }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)


  const [isOpen, setIsOpen] = useState(false);

  const openBookingModal = useCallback((item) => {
    setIsBookingModalOpen(true);
    setSelectedItem(item);
  }, []);
  const closeBookingModal = useCallback((item) => {
    setIsBookingModalOpen(false);
    setSelectedItem(null);
  }, []);

  const bookingContextValue = useMemo(() => ({
    isBookingModalOpen,
    selectedItem,
    setIsBookingModalOpen,
    openBookingModal,
    closeBookingModal,
    isOpen,
    setIsOpen
  }), [isBookingModalOpen, selectedItem, openBookingModal, closeBookingModal, isOpen, setIsOpen]);

  return (
    <BookingContext.Provider value={bookingContextValue}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBookingContext = () => useContext(BookingContext)