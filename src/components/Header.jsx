import { NavLink } from "react-router-dom";
import '../assets/styles/header.css'
import { useState } from "react";
import { useModals } from "../contexts/ModalsProvider";


function Header() {
    const [isActive, setIsActive] = useState(false);
    const { setIsOpen, openCallbackModal } = useModals()
    const toggleMenu = () => {
        setIsActive(!isActive);
    };
    return (
        <>
            <header className="header">
                {/* <li className="header_list-item">
                <NavLink className='header_link' to="/login">Login</NavLink>
            </li> */}
                <li className="header_list-item">
                    <NavLink className='header_link' to={`/admin`}>Admin</NavLink>
                </li>
                <div className="container">
                    <div className="header__top-content">
                        <ul className="header__menu-items">
                            <li className="header__menu-item">
                                <NavLink className='header__menu-link' to={`/`}>О нас</NavLink>
                            </li>
                            <li className="header__menu-item">
                                <NavLink className='header__menu-link' to={`/houses`}>Дома</NavLink>
                            </li>
                            <li className="header__menu-item">
                                <NavLink className='header__menu-link' to={`/apartments`}>Квартиры</NavLink>
                            </li>
                            <li className="header__menu-item">
                                <NavLink className='header__menu-link' to={`/reservation`}>Бронирование</NavLink>
                            </li>
                            {/* <li className="header__menu-item">
                                <NavLink className='header__menu-link' href="#">Отзывы</NavLink>
                            </li> */}
                        </ul>
                        <div className="header__contacts">
                            <button onClick={() => openCallbackModal()} className="header__contacts-btn">
                                Заказать обратный звонок
                            </button>
                            <a href="tel:89242122377" className="header__contacts-num">
                                +7 (924)-212-23-77
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <div className="header__top-content header__top-content--min">
                <div className="container">
                    <div className="header__contacts">
                        <a href="#" className="header__logo">
                            <img src="/src/assets/images/icons/logo.png" alt="" />
                        </a>
                        <button onClick={() => setIsOpen(true)} className="header__contacts-btn">
                            Заказать звонок
                        </button>
                        <button className={`menu__btn ${isActive ? 'active' : ''}`} onClick={toggleMenu}></button>
                    </div>
                </div>
            </div>
            <ul className={`header__menu-items header__menu-items--min ${isActive ? 'active' : ''}`}>
                <li className="header__menu-item">
                    <NavLink onClick={toggleMenu} className='header__menu-link' to={`/`}>О нас</NavLink>
                </li>
                <li className="header__menu-item">
                    <NavLink onClick={toggleMenu} className='header__menu-link' to={`/houses`}>Дома</NavLink>
                </li>
                <li className="header__menu-item">
                    <NavLink onClick={toggleMenu} className='header__menu-link' to={`/apartments`}>Квартиры</NavLink>
                </li>
                <li className="header__menu-item">
                    <NavLink onClick={toggleMenu} className='header__menu-link' to={`/reservation`}>Бронирование</NavLink>
                </li>
                {/* <li className="header__menu-item">
                    <a onClick={toggleMenu} className='header__menu-link' href="#">Отзывы</a>
                </li> */}
            </ul>
        </>
    );
}

export default Header;