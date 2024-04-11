import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRoomsAsync } from '../../../store/features/lists/rooms/roomsFetch';
import { fetchApartsAsync } from '../../../store/features/lists/aparts/apartsFetch';
import { fetchHousesAsync } from '../../../store/features/lists/houses/housesFetch';
// import ErrorMessage from '../../../components/ErrorMessage';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function ItemsList({ onSelectItem }) {
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.rooms.allRooms);
  const aparts = useSelector((state) => state.aparts.data);
  const houses = useSelector((state) => state.houses.data);
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(fetchAllRoomsAsync());
    dispatch(fetchApartsAsync());
    dispatch(fetchHousesAsync());
  }, [dispatch]);


  return (
    isLoading ? (
      <LoadingSpinner />
    ) : (
      <div style={{ display: 'block' }}>
        <p className='items__list-title'>Выберите квартиру или комнату для добавления брони</p>
        {houses.map(house => (
          <div key={house.id} className="houseItem">
            <p>{house.name}</p>
            <div className="roomsList">
              {rooms.filter(room => room.houseId === house.id).length > 0 ?
                (rooms.filter(room => room.houseId === house.id).map(room => (
                  <button key={room.id}
                    onClick={() => onSelectItem(room)}>
                    {room.name}
                  </button>
                ))) : (
                  <p>Нет комнат</p>
                )
              }
            </div>
          </div>
        ))}
        <div className='items__list-category'>Квартиры:</div>
        {aparts.map(apart => (
          <div key={apart.id} className="apartItem">
            <button onClick={() => onSelectItem(apart)}
            >{apart.name}</button>
          </div>
        ))}
      </div>
    )
  )
}
