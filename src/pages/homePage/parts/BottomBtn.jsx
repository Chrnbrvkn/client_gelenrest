export default function BottomBtn({ setIsOpen}){

  return (
      <div className="bottom__btn">
        {/* <button onClick={() => setIsOpen(true)} className="bottom__btn-top">
          Забронировать свой отдых
        </button> */}
        <a className="bottom__btn-top" href="#">
          Забронировать свой отдых
        </a>
        <a className="bottom__btn-bottom" href="#">
          Оставить отзыв
        </a>
      </div>
  )
}