import { useState, useEffect } from "react"
import { getAparts, getApartAllImages } from "../../api/apartsApi";
import '../../assets/styles/pagesStyles/houses.css';
import altPicture from '../../assets/images/homeCards/home-1.png'
import { NavLink } from "react-router-dom";

export default function Aparts() {
  const [aparts, setAparts] = useState([])
  const [apartPictures, setApartPictures] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartsData = await getAparts()
        if (apartsData) {
          setAparts(apartsData)
        }
        const pictures = await getApartAllImages()
        setApartPictures(pictures)
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, [])

  console.log(apartPictures);
  const handleApartImage = (apartId) => {
    const picture = apartPictures.find(pic => pic.apartId = apartId)
    return picture ? `http://45.80.69.128:3000${picture.url}` : altPicture
  }

  const renderTimeToItem = (label, time, iconSrc) => {
    return (
      <div className="time__item">
        <div className="time__item-left">
          <img src={iconSrc} alt={label} />
          <p>{label}</p>
        </div>
        <p className="time__item-right">{time}</p>
      </div>
    )
  }
  return (<>
    <section className="houses">
      <div className="container">
        <ul className="breadcrumb">
          <li className="breadcrumb__item">
            <a href="#">
              Главная
            </a>
          </li>
          <li className="breadcrumb__item">
            Квартиры
          </li>
        </ul>
        <div className="houses__items">
          {aparts.map(apart => (
            <div key={apart.id} className="house__item">
              <h5 className="house__item-title house__item-title--min">
                {apart.name}
              </h5>
              <div className="house__item__left">
                <img src={handleApartImage(apart.id)} alt={apart.name} className="house__item-img" />
                <div className="house__item-buttons">
                  <a href="#" className="house__item-button--left">Забронировать</a>
                  <NavLink to={`/apartments/${apart.id}`} className="house__item-button-right">Смотреть квартиру</NavLink>
                </div>
              </div>
              <div className="house__item-right">
                <h5 className="house__item-title house__item-title--max">{apart.name}</h5>
                <div className="house__item-prop">
                  <div className="prop__item">
                    <p className="prop__item-left">Количество спальных мест</p>
                    <p className="prop__item-left">{apart.roomCount}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Категория квартиры</p>
                    <p className="prop__item-left">{apart.roomCategories}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Питание</p>
                    <p className="prop__item-left">{apart.meal}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Условия бронирования</p>
                    <p className="prop__item-left">{apart.bookingConditions}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Расчетный час</p>
                    <p className="prop__item-right">{apart.checkoutTime}</p>
                  </div>
                </div>
                <div className="house__item-time">
                  {renderTimeToItem("Море", apart.timeToSea, "src/assets/images/icons/sea.svg")}
                  {renderTimeToItem("Рынок", apart.timeToMarket, "src/assets/images/icons/shop.svg")}
                  {renderTimeToItem("Кафе", apart.timeToCafe, "src/assets/images/icons/cafe.svg")}
                  {renderTimeToItem("Автобусная остановка", apart.timeToBusStop, "src/assets/images/icons/bus.svg")}
                  {renderTimeToItem("Центр города", apart.timeToBusCityCenter, "src/assets/images/icons/map.svg")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>

  )
}