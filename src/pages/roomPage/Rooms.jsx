import React, { useContext } from 'react';
import { NavLink, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useApiData } from '../../contexts/ApiProvider';
import '../../assets/styles/pagesStyles/room.css';
import '../../assets/styles/pagesStyles/house.css';

import RoomDetails from './RoomDetails';
import RoomCard from './RoomCard';

export default function Rooms() {
  const { houseId, roomId } = useParams();
  const { rooms, roomsPictures, houses } = useApiData();

  const house = houses.find(h => h.id === parseInt(houseId));
  const currentRoom = rooms.find(r => r.id === parseInt(roomId));
  const roomImages = roomsPictures.filter(pic => pic.roomId === parseInt(roomId));
  const otherRooms = rooms.filter(room => room.houseId === parseInt(houseId) && room.id !== parseInt(roomId));

  return (
    <div className='room'>
      <div className="container">
        <ul className="breadcrumb">
          <li className="breadcrumb__item"><NavLink to={`/houses`}>Список домов</NavLink></li>
          <li className="breadcrumb__item"><NavLink to={`/houses/${houseId}`}>{house?.name}</NavLink></li>
          <li className="breadcrumb__item">Комната: {currentRoom?.name}</li>
        </ul>
        <RoomDetails room={currentRoom} roomImages={roomImages} />

        {/* Список других комнат */}
        <div className="room__items">
          {otherRooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}























// import React, { useContext, useState, useEffect } from 'react';
// import { NavLink } from "react-router-dom";
// import { useParams } from 'react-router-dom';

// import '../../assets/styles/pagesStyles/room.css';
// import '../../assets/styles/pagesStyles/house.css';
// import leftArrow from '../../assets/images/icons/houses-icons/arrow-left.svg';
// import rightArrow from '../../assets/images/icons/houses-icons/arrow-right.svg';
// import { useApiData } from '../../contexts/ApiProvider';


// export default function Rooms() {
//   const { houseId, roomId } = useParams();
//   const { rooms, roomsPictures, houses } = useApiData();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const house = houses.find(h => h.id === parseInt(houseId));
//   const currentRoom = rooms.find(r => r.id === parseInt(roomId));
//   const roomImages = roomsPictures.filter(pic => pic.roomId === parseInt(roomId));

// console.log(currentRoom);
// console.log(roomImages);

//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % roomImages.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + roomImages.length) % roomImages.length);


//   return (
//     <div className='room'>
//       <div className="container">
//         <ul className="breadcrumb">
//           <li className="breadcrumb__item"><NavLink to={`/houses`}>Список домов</NavLink></li>
//           <li className="breadcrumb__item"><NavLink to={`/houses/${houseId}`}>{house?.name}</NavLink></li>
//           <li className="breadcrumb__item">Комната: {currentRoom?.name}</li>
//         </ul>
//         <div className="room__main">
//           <p className="room__main-title">
//             {currentRoom.name}
//           </p>
//           <div className="room__main-content">
//             <div className="room__main-left">
//               <div className='slider__house'>
//                 <button className='house__slider-prev' onClick={prevSlide}>
//                   <img src={leftArrow} alt="Previous" />
//                 </button>
//                 {roomImages.length > 0 && (
//                   <img className="slider__house-front" src={`https://api.gelenrest.ru${roomImages[currentSlide].url}`} alt="Room" />
//                 )}
//                 <button className='house__slider-next' onClick={nextSlide}>
//                   <img src={rightArrow} alt="Next" />
//                 </button>
//               </div>
//               <div className='slider__house-photos'>
//               </div>
//               <button className="room__main-btn room__main-btn--max">
//                 Забронировать
//               </button>
//             </div>
//             <div className="room__main-right">
//               <div className="room__main-inform">
//                 <div className="room__main-inform--item">
//                   <div className="room__main-inform--left">
//                     <img src={door} alt="" />
//                     <p>Количество комнат</p>
//                   </div>
//                   <div className="room__main-inform--right">
//                     {currentRoom.roomCount}
//                   </div>
//                 </div>
//                 <div className="room__main-inform--item">
//                   <div className="room__main-inform--left">
//                     <img src={occupied} alt="" />
//                     <p>Спальные места</p>
//                   </div>
//                   <div className="room__main-inform--right">
//                     {currentRoom.bedroom}
//                   </div>
//                 </div>
//                 <div className="room__main-inform--item">
//                   <div className="room__main-inform--left">
//                     <img src={stairs} alt="" />
//                     <p>Этаж</p>
//                   </div>
//                   <div className="room__main-inform--right">
//                     3
//                   </div>
//                 </div>
//                 <div className="room__main-inform--item">
//                   <div className="room__main-inform--left">
//                     <img src={faucet} alt="" />
//                     <p>Санузел</p>
//                   </div>
//                   <div className="room__main-inform--right">
//                     {currentRoom.bathroom}
//                   </div>
//                 </div>
//                 <div className="room__main-inform--item">
//                   <div className="room__main-inform--left">
//                     <img src={food} alt="" />
//                     <p>Питание</p>
//                   </div>
//                   <div className="room__main-inform--right">
//                     {currentRoom.meal}
//                   </div>
//                 </div>
//               </div>
//               <div className="room__main-facilities">
//                 <p>
//                   Удобства
//                 </p>
//                 <p>
//                   {currentRoom.facilities}
//                 </p>
//               </div>
//               <div className="room__main-price">
//                 <div className="room__main-price--top">
//                   <p>Цены,</p>
//                   <p> 2024 год</p>
//                 </div>
//                 <div className="room__main-price--bottom">
//                   <p>{currentRoom.price}р / сутки</p>
//                 </div>
//               </div>
//               <button className="room__main-btn room__main-btn--min">
//                 Забронировать
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="room__items">
//           {rooms.filter(room => room.id != roomId).map((room, index) => (
//             <div key={index} className="room__main">
//               <p className="room__main-title">
//                 {room.name}
//               </p>
//               <div className="room__main-content">
//                 <div className="room__main-left">
//                   <div className='slider__house'>
//                     <button className='house__slider-prev' onClick={prevSlide}>
//                       <img src={leftArrow} alt="" />
//                     </button>
//                     {roomsPictures[current] && (
//                       <img className="slider__house-front" src={`https://api.gelenrest.ru${roomsPictures[current].url}`} />
//                     )}
//                     <button className='house__slider-next' onClick={nextSlide}>
//                       <img src={rightArrow} alt="" />
//                     </button>
//                   </div>
//                   <div className='slider__house-photos'>
//                   </div>
//                   <Link to={`/reservation/room/${room.id}`} className="room__main-btn room__main-btn--link">Забронировать</Link>
//                 </div>
//                 <div className="room__main-right">
//                   <div className="room__main-inform">
//                     <div className="room__main-inform--item">
//                       <div className="room__main-inform--left">
//                         <img src={door} alt="" />
//                         <p>Количество комнат</p>
//                       </div>
//                       <div className="room__main-inform--right">
//                         {room.roomCount}
//                       </div>
//                     </div>
//                     <div className="room__main-inform--item">
//                       <div className="room__main-inform--left">
//                         <img src={occupied} alt="" />
//                         <p>Спальные места</p>
//                       </div>
//                       <div className="room__main-inform--right">
//                         {room.bedroom}
//                       </div>
//                     </div>
//                     <div className="room__main-inform--item">
//                       <div className="room__main-inform--left">
//                         <img src={stairs} alt="" />
//                         <p>Этаж</p>
//                       </div>
//                       <div className="room__main-inform--right">
//                         3
//                       </div>
//                     </div>
//                     <div className="room__main-inform--item">
//                       <div className="room__main-inform--left">
//                         <img src={faucet} alt="" />
//                         <p>Санузел</p>
//                       </div>
//                       <div className="room__main-inform--right">
//                         {room.bathroom}
//                       </div>
//                     </div>
//                     <div className="room__main-inform--item">
//                       <div className="room__main-inform--left">
//                         <img src={food} alt="" />
//                         <p>Питание</p>
//                       </div>
//                       <div className="room__main-inform--right">
//                         {room.meal}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="room__main-facilities">
//                     <p>
//                       Удобства
//                     </p>
//                     <p>
//                       {room.facilities}
//                     </p>
//                   </div>
//                   <div className="room__main-price">
//                     <div className="room__main-price--top">
//                       <p>Цены,</p>
//                       <p> 2024 год</p>
//                     </div>
//                     <div className="room__main-price--bottom">
//                       <p>{room.price}р / сутки</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }