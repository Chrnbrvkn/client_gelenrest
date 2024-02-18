import logo from '/src/assets/images/imageHome/other/home-logo-1.png'

export default function TopContent(){


  return (
      <div className="top__content">
        <div className="container">
          <a className="top__logo" href="#">
            <img className="top_logo-img" src={logo} alt="" />
          </a>
          <div className="top__content-buttons">
            <a href="https://t.me/gelenzal" className="top__content-button-1">
              Проживание
            </a>
            <a href="https://t.me/gelenzal" className="top__content-button-2">
              Прокат сапы, яхты
            </a>
            <a href="https://t.me/gelenzal" className="top__content-button-3">
              Вечеринки
            </a>
            <a href="https://t.me/gelenzal" className="top__content-button-4">
              Покушать
            </a>
          </div>
        </div>
      </div>
      )
    }