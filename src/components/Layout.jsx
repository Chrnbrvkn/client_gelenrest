
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer'
import CallbackModal from './CallbackModal'
import { useModals } from "../contexts/ModalsProvider";
import {ReserveModal} from 'src/widgets/ReserveModal';
import Toast from "./Toast";

export default function Layout() {
    const {
        callbackModal,
        bookingModal,
        closeCallbackModal,
        closeBookingModal
    } = useModals();

    
    return (
        <>
            <CallbackModal 
                isOpen={callbackModal.isOpen} 
                setIsOpen={closeCallbackModal} 
            />
            <ReserveModal 
                isOpen={bookingModal.isOpen} 
                selectedItem={bookingModal.selectedItem} 
                closeModal={closeBookingModal} 
            />
            <Header />
            <Toast />
            <Outlet />
            <Footer />
        </>
    );
}
