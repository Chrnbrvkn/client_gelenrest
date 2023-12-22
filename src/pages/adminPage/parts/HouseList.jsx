import { useState, useEffect, useCallback } from "react";
import { getHouses, deleteHouse } from "../../../api/housesApi";
import AddHouseForm from "./AddHouseForm";
import HouseItem from "./HouseItem";


const EmptyListMessage = () => <div>Список домов пуст</div>;

export default function HouseList({
  houses,
  handleEdit,
  houseFormData,
  onChange,
  onFetchHouses,
  showHouseForm,
  onToggleHouseForm,
}) {

  const handleDeleteHouse = useCallback(async (houseId, name) => {
    await deleteHouse(houseId, name);
    onFetchHouses(); 
  }, [onFetchHouses])

  return (
    <>
      {showHouseForm ? (
        <AddHouseForm
          houseFormData={houseFormData}
          onChange={onChange}
          onHouseAdded={onFetchHouses}
        />
      ) : (
        <div className="houses__list">
          <div className="houses__list-top">
            <p>Список домов</p>
            <button onClick={onToggleHouseForm} className="houses__list-add">
              Добавить
            </button>
          </div>
          {Array.isArray(houses) && houses.length > 0 ? (
            houses.map(house => (
              <HouseItem
                handleEdit={handleEdit}
                key={house.id}
                house={house}
                onDelete={() => handleDeleteHouse(house.id, house.name)}
              />
            ))
          ) : (
            <EmptyListMessage />
          )}

        </div>
      )}
    </>
  );
}
