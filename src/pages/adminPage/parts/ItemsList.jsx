import React from 'react';
import { useApiData } from '../../../contexts/ApiProvider';
import { useAdmin } from '../../../contexts/AdminProvider';

export default function ItemsList() {
  const { isLoading, rooms, aparts } = useApiData();
  const { setSelectedItem, setViewState } = useAdmin();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSelectItem = (item) => {
    console.log("Selecting item:", item);
    setSelectedItem(item);
    setViewState('form');
  };


  return (
    <div> Выберите квартиру или комнату для добавления брони
      <div>Комнаты:</div>
      {rooms.map(room => (
        <button key={room.id}
          onClick={() => handleSelectItem({
            houseId: room.houseId,
            itemId: room.id,
            itemType: 'room'
          })}
        >{room.name}</button>
      ))}
      <div>Квартиры:</div>
      {aparts.map(apart => (
        <button key={apart.id}
          onClick={() => handleSelectItem({
            houseId: null,
            itemId: apart.id,
            itemType: 'apart'
          })}
        >{apart.name}</button>
      ))}
    </div>
  )
}
