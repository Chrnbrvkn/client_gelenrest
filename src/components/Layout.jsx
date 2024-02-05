
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer'
import CallbackModal from './CallbackModal'
import { useState } from "react";
import { useBookingContext } from "../contexts/BookingProvider";
import BookingModal from '../components/BookingModal'

export default function Layout() {
    const { isBookingModalOpen, selectedItem, closeBookingModal } = useBookingContext();
    let [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <CallbackModal isOpen={isOpen} setIsOpen={setIsOpen} />
            {isBookingModalOpen && <BookingModal isOpen={isBookingModalOpen} closeModal={closeBookingModal} selectedItem={selectedItem} />}
            <Header isOpen={isOpen} setIsOpen={setIsOpen} />
            <Outlet />
            <Footer isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}
