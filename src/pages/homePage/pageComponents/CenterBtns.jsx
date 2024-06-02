import { NavLink } from "react-router-dom"


export default function CenterBtns(){


  return (
      <div className="center__btn">
        <NavLink className="center__btn-left" to="/houses">
          Дома
        </NavLink>
        <NavLink className="center__btn-right" to="/apartments">
          Квартиры
        </NavLink>
      </div>
    )
}