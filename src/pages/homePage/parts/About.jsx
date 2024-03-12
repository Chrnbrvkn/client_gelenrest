import { NavLink } from "react-router-dom";

export default function About() {


  return (

    <div className="about">
      <div className="container">
        <div className="about__content about__content-max">
          <h3 className="about__title">
            Добро пожаловать в город-курорт Геленджик!<br />
            <p>Меня зовут Михаил!</p>
          </h3>
          <p className="about__text about__text-1">
            Я с радостью предоставлю Вам размещение в гостевом семейном доме или квартире! Собственник, не агентство! А так же мы организуем Ваш курортный досуг! У нас есть шахматы, велосипеды, самокаты, яхтинг, джипинг, вечеринки!
          </p>
          <p className="about__text about__text-2">Михаил всегда ждет в гости! Проходите по кнопке и выбирайте лучший для Вас вариант проживания по цене и качеству! </p>
          <h4 className="about__subtitle" aria-hidden="true">
            На сегодня места с утра были!
          </h4>
          <NavLink to={`/reservation`} className="about__btn">
            Забронировать свой отдых
          </NavLink>
        </div>

        <div className="about__content about__content-min">
          <h3 className="about__title">
            Добро пожаловать в город-курорт Геленджик!<br />
            <p>Меня зовут Михаил!</p>
          </h3>
          <p className="about__text about__text-1">
            Я с радостью предоставлю Вам размещение в гостевом семейном доме или квартире! Собственник, не агентство! А так же мы организуем Ваш курортный досуг! У нас есть шахматы, велосипеды, самокаты, яхтинг, джипинг, вечеринки!
          </p>
          <p className="about__text about__text-2">
            Михаил всегда ждет в гости! Проходите по кнопке и выбирайте лучший для Вас вариант проживания по цене и качеству!
          </p>

          <h4 className="about__subtitle" aria-hidden="true">
            На сегодня места с утра были!
          </h4>
          <NavLink to={`/reservation`} className="about__btn">
            Забронировать свой отдых
          </NavLink>
        </div>
      </div>
    </div>
  )
}