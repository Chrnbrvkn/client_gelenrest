import '../assets/styles/footer.css'
import logo from '/src/assets/images/icons/logo.png'
import vk from '/src/assets/images/icons/vk.svg'
import tg from '/src/assets/images/icons/tel.svg'
import { useModals } from '../contexts/ModalsProvider'


export default function Footer() {

  const { setIsOpen} = useModals()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <a className="footer__logo">
            <img className="footer__logo-img" href="#" src={logo} />
          </a>
          <h2 className='footer__title'>
            Михаил ждет Вас в гости!
          </h2>
          <div className='footer__general'>
            <div className='footer__general-contacts'>
              <p className='footer__general-title'>КОНТАКТЫ
              </p>
              <a className='footer__general-phone' href='tel:89376672021'>
                +7 (937) 667 20-21
              </a>
              <a className='footer__general-item' href='#'>
                <img className="footer__socital-vk" src={tg} /><p className='footer_general-text--max'>vk.com/gelmisa</p>
                <p className='footer_general-text--min'>Вконтакте</p>
              </a>
              <a className='footer__general-item' href='https://t.me/gelenzal'>
                <img className="footer__socital-vk" src={vk} /><p className='footer_general-text--max'>t.me/gelendzhik_travel_mihail</p>
                <p className='footer_general-text--min'>Telegram</p>
              </a>
            </div>
            <div className='footer__general-info'>
              <p className='footer__general-title'>ИНФОРМАЦИЯ
              </p>
              <a className='footer__general-item' href='#'>
                Правила бронирования
              </a>
              <a className='footer__general-item' href='#'>
                Правила проживания
              </a>
              <a className='footer__general-item' href='#'>
                Дополнительные услуги
              </a>
              <a className='footer__general-item' href='#'>
                Договор оферты
              </a>
              <a className='footer__general-item' href='#'>
                Политика конфиденциальности
              </a>
              <div className='footer__copy'>
                <a className='footer__copy-link' href='#'>Создание и сопровождение сайта - Formula Frontend
                </a>
                <a className='footer__copy-link' href='#'>Дизайн сайта - Елизавета Заслонова
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="footer__link-autor">
          
        </p>
      </div>
    </footer>
  )
}