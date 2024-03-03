
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer'
import CallbackModal from './CallbackModal'
import { useState } from "react";
import { useModals } from "../contexts/ModalsProvider";
import BookingModal from '../components/BookingModal'

export default function Layout() {
    const {
        callbackModal,
        bookingModal,
        openCallbackModal,
        closeCallbackModal,
        openBookingModal,
        closeBookingModal
    } = useModals();
    return (
        <>
            <CallbackModal isOpen={callbackModal.isOpen} setIsOpen={closeCallbackModal} />
            <BookingModal isOpen={bookingModal.isOpen} selectedItem={bookingModal.selectedItem} closeModal={closeBookingModal} />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
