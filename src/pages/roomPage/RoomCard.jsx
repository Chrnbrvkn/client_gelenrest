import React from "react";
import { useParams } from "react-router-dom";
import { useApiData } from "../../contexts/ApiProvider";
import { Link } from "react-router-dom";
import { roomIcons } from "../../constants/iconsPath";

export default function RoomCard({ room }) {
  const { roomId } = useParams();
  const { roomsPictures } = useApiData();
  const roomImage = roomsPictures.find((pic) => pic.roomId === room.id);
  console.log(room);
  return (
    <div className="room__card">
      <h3>{room.name}</h3>
      <div className="room__card-left">
        <img
          src={
            roomImage
              ? `https://api.gelenrest.ru${roomImage.url}`
              : "path/to/default/image"
          }
          alt={room.name}
        />
        <Link
          to={`/rooms/${roomId}/room/${room.id}`}
          className="room__card-btn"
        >
          Подробнее
        </Link>
      </div>
      <div className="room__card-right">
        <div className="room__card-details">
          {/* Дополнительные детали комнаты */}
          <div className="room__main-right">
            <div className="room__main-option">
              <div className="room__main-option--item">
                <div className="left">
                  <img src={roomIcons.roomsCount} alt="" />
                  <p>Количество комнат</p>
                </div>
                <div className="right">{room.roomCount}</div>
              </div>
              <div className="room__main-option--item">
                <div className="left">
                  <img src={roomIcons.bedroom} alt="" />
                  <p>Спальные места</p>
                </div>
                <div className="right">{room.roomCount}</div>
              </div>
              <div className="room__main-option--item">
                <div className="left">
                  <img src={roomIcons.level} alt="" />
                  <p>Этаж</p>
                </div>
                <div className="right">{room.roomCount}</div>
              </div>
              <div className="room__main-option--item">
                <div className="left">
                  <img src={roomIcons.bathroom} alt="" />
                  <p>Санузел</p>
                </div>
                <div className="right">{room.roomCount}</div>
              </div>
              <div className="room__main-option--item">
                <div className="left">
                  <img src={roomIcons.sharedKitchen} alt="" />
                  <p>Питание</p>
                </div>
                <div className="right">{room.roomCount}</div>
              </div>
            </div>
            <div className="room__main-facilities">{room.facilities}</div>
            <div className="room__main-price">
              <p>Цена: {room.price} р./сутки</p>
            </div>
            <p className="room__main-warning">
              <span>Внимание! </span>Цены ориентировочные. Уточните цену у
              хозяина.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
