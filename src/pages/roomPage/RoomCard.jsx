import React from 'react'
import { useParams } from 'react-router-dom';
import { useApiData } from '../../contexts/ApiProvider';
import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
  const { roomId } = useParams();
  const { roomsPictures } = useApiData();
  const roomImage = roomsPictures.find(pic => pic.roomId === room.id);

  return (
    <div className="room__card">
      <img src={roomImage ? `https://api.gelenrest.ru${roomImage.url}` : 'path/to/default/image'} alt={room.name} />
      <div className="room__card-details">
        <h3>{room.name}</h3>
        {/* Дополнительные детали комнаты */}
        <Link to={`/rooms/${roomId}/room/${room.id}`} className="room__card-btn">Подробнее</Link>
      </div>
    </div>
  );
}
