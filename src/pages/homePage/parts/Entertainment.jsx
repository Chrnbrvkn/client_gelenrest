import yachtsGallery1 from '/src/assets/images/imageHome/yachts/yachts__gallery-1.png';
import yachtsGallery2 from '/src/assets/images/imageHome/yachts/yachts__gallery-2.png';
import yachtsGallery3 from '/src/assets/images/imageHome/yachts/yachts__gallery-2.png';
import yachtsGallery4 from '/src/assets/images/imageHome/yachts/yachts__gallery-2.png';
import yachtsGallery5 from '/src/assets/images/imageHome/yachts/yachts__gallery-2.png';
import yachtsGallery6 from '/src/assets/images/imageHome/yachts/yachts__gallery-2.png';
import yachtsGallery7 from '/src/assets/images/imageHome/yachts/yachts__gallery-2.png';

import party1 from '/src/assets/images/imageHome/parties/parties__gallery-1.png';
import party2 from '/src/assets/images/imageHome/parties/parties__gallery-2.png';
import party3 from '/src/assets/images/imageHome/parties/parties__gallery-3.png';
import party4 from '/src/assets/images/imageHome/parties/parties__gallery-4.png';
import party5 from '/src/assets/images/imageHome/parties/parties__gallery-5.png';

import bike1 from '/src/assets/images/imageHome/bike/bike__gallery-1.png';
import bike2 from '/src/assets/images/imageHome/bike/bike__gallery-2.png';
import bike3 from '/src/assets/images/imageHome/bike/bike__gallery-3.png';
import bike4 from '/src/assets/images/imageHome/bike/bike__gallery-4.png';
import bike5 from '/src/assets/images/imageHome/bike/bike__gallery-5.png';

export default function Entertainment() {

  return (

    <div className="entertainment">
      <div className="container">
        <h4 className="entertainment__title">
          Море активных развлечений и спорта
          в гостях у Михаила
        </h4>
        <div className="yachts">
          <h3 className="yachts__title">
            Сапы, яхты
          </h3>
          <div className="yachts__gallery">
            <div className="yachts__gallery-left">
              <div className="yachts__gallery-left--top">
                {/* <img src={yachtsGallery1} alt="" className="yachts__gallery-1" /> */}
                <img src={yachtsGallery2} alt="" className="yachts__gallery-2" />
              </div>
              <div className="yachts__gallery-left--bottom">
                <img src={yachtsGallery3} alt="" className="yachts__gallery-3" />
                <img src={yachtsGallery4} alt="" className="yachts__gallery-4" />
                <img src={yachtsGallery5} alt="" className="yachts__gallery-5" />
              </div>
            </div>
            <div className="yachts__gallery-right">
              <img src={yachtsGallery6} alt="" className="yachts__gallery-6" />
              <img src={yachtsGallery7} alt="" className="yachts__gallery-7" />
            </div>
          </div>
          <p className="yachts__text">
            Я с радостью организую для вас незабываемую поездку на яхте, в приятной компании, с музыкой, танцами в кругу друзей и новых знакомых.
            А так же атмосферую прогулку на сапбордах по побережью Черного моря
          </p>
        </div>
        <div className="parties">
          <h3 className="parties__title">
            Вечеринки
          </h3>
          <div className="parties__gallery">
            <div className="parties__gallery-left">
              <div className="parties__gallery-left--top">
                <img src={party1} alt="" className="parties__gallery-1" />
              </div>
              <div className="parties__gallery-left--bottom">
                <img src={party2} alt="" className="parties__gallery-2" />
                <img src={party3} alt="" className="parties__gallery-3" />
              </div>
            </div>
            <div className="parties__gallery-right">
              <img src={party4} alt="" className="parties__gallery-4" />
              <img src={party5} alt="" className="parties__gallery-5" />
            </div>
          </div>
          <p className="parties__text">
            Lorem ipsum dolor sit amet consectetur. Id tristique sed in interdum scelerisque praesent libero diam. Sit risus ultrices magnis metus lectus dis purus lacus. Pellentesque in aliquet in ac elementum ultrices sed. Ipsum amet volutpat nulla vulputate.
          </p>
        </div>
        <div className="bike">
          <h3 className="bike__tittle">
            Велосипеды, Джиппинг, Самокаты
          </h3>
          <div className="bike__gallery">
            <div className="bike__gallery-left">
              <div className="bike__gallery-left--top">
                <img src={bike1} alt="" className="bike__gallery-1" />
              </div>
              <div className="bike__gallery-left--bottom">
                <img src={bike2} alt="" className="bike__gallery-2" />
                <img src={bike3} alt="" className="bike__gallery-3" />
              </div>
            </div>
            <div className="bike__gallery-right">
              <img src={bike4} alt="" className="bike__gallery-4" />
              <img src={bike5} alt="" className="bike__gallery-5" />
            </div>
          </div>
          <div className="bike__text">
            Отправиться в поездку на джиппе по ...
            Прогулки на велосипедах, а так же прокат городских самокатов для вашего удобства и отдыха.
          </div>
        </div>
      </div>
    </div>
  )
}