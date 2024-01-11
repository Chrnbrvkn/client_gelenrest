import { NavLink } from "react-router-dom";
import '../assets/styles/header.css'

function Header() {

    return (
        <header className="header">
            {/* <li className="header_list-item">
                <NavLink className='header_link' to="/login">Login</NavLink>
            </li> */}
            <li className="header_list-item">
                <NavLink className='header_link' to="/admin">Admin</NavLink>
            </li>
            <div className="container">
                <div className="header__top-content">
                    <ul className="header__menu-items">
                        <li className="header__menu-item">
                            <NavLink className='header__menu-link' to="/">О нас</NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink className='header__menu-link' to="/houses">Дома</NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink className='header__menu-link' to="/apartments">Квартиры</NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink className='header__menu-link' to="/reservation">Бронирование</NavLink>
                        </li>
                        <li className="header__menu-item">
                            <a className='header__menu-link' href="">Отзывы</a>
                        </li>
                    </ul>
                    <div className="header__contacts">
                        <button className="header__contacts-btn">
                            Заказать обратный звонок
                        </button>
                        <a href="tel:89242122377" className="header__contacts-num">
                            +7 (924)-212-23-77
                        </a>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;