import { NavLink } from "react-router-dom";

export default function BottomBtn({ setIsOpen}){

  return (
      <div className="bottom__btn">
        {/* <button onClick={() => setIsOpen(true)} className="bottom__btn-top">
          Забронировать свой отдых
        </button> */}
        <NavLink className="bottom__btn-top" to={`/reservation`}>
          Забронировать свой отдых
        </NavLink>
        <a className="bottom__btn-bottom" href="#">
          Оставить отзыв
        </a>
      </div>
  )
}