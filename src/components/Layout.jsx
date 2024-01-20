
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer'
import CallbackModal from './CallbackModal'
import { useState } from "react";

function Layout() {
    let [isOpen, setIsOpen] = useState(false)


    return (
        <>
            <CallbackModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <Header isOpen={isOpen} setIsOpen={setIsOpen} />
            <Outlet isOpen={isOpen} setIsOpen={setIsOpen} />
            <Footer isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}

export default Layout;