import React, { useState } from 'react';
import { useApiData } from '../../../contexts/ApiProvider';
import { useAdmin } from '../../../contexts/AdminProvider';

export default function ItemsList() {
  const { isLoading, rooms, aparts, houses } = useApiData();
  const { setSelectedItem, setViewState } = useAdmin();
  const [selectedHouse, setSelectedHouse] = useState(null)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setViewState('form');
  };

  const handleSelectedHouse = (houseId) => {
    setSelectedHouse(prevHouseId => prevHouseId === houseId ? null : houseId);
  }

  return (
    <div>
      <p className='items__list-title'>Выберите квартиру или комнату для добавления брони</p>
      <div className='items__list-category'>Выберите дом:</div>
      {houses.length > 0 ?? houses.map(house => (
        <div key={house.id} className="houseItem">
          <button onClick={() => handleSelectedHouse(house.id)}>{house.name}</button>
          <div className="roomsList">
            {selectedHouse === house.id && (
              <>
                <p className='items__list-category'>Комнаты:</p>
                {rooms.map(room => (
                  <button key={room.id} onClick={() => handleSelectItem(room)}>{room.name}</button>
                ))}
              </>
            )}
          </div>
        </div>
      ))}
      <div className='items__list-category'>Квартиры:</div>
      {aparts.map(apart => (
        <div key={apart.id} className="apartItem">
          <button onClick={() => handleSelectItem(apart)}
          >{apart.name}</button>
        </div>
      ))}

    </div>
  )
}
