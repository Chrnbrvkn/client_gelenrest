import { useState, useEffect, useCallback } from "react";
import { getHouses, deleteHouse } from "../../../api/housesApi";
import AddHouseForm from "../add/AddHouseForm";
import HouseItem from "../items/HouseItem";
import EmptyListMessage from "../../../components/EmptyListMessage";

export default function HouseList({
  houses,
  handleEdit,
  houseFormData,
  onChange,
  onFetchHouses,
  showForm,
  onToggleForm,
  data
}) {

  const handleDeleteHouse = useCallback(async (houseId, name) => {
    await deleteHouse(houseId, name);
    onFetchHouses();
  }, [onFetchHouses])

  return (
    <>
      {showForm ? (
        <AddHouseForm
          houseFormData={houseFormData}
          onChange={onChange}
          onHouseAdded={onFetchHouses}
          onToggleHouseForm={onToggleForm}
        />
      ) : (
        <div className="houses__list">
          <div className="houses__list-top">
            <p>Список домов</p>
            <button onClick={onToggleForm} className="houses__list-add">
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
