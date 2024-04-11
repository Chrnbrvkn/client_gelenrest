import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHousesAsync, deleteHouseAsync } from "../../../store/features/lists/houses/housesFetch";
import AddHouseForm from "../add/AddHouseForm";
import HouseItem from "../items/HouseItem";
import EmptyListMessage from "../../../components/EmptyListMessage";
import { showForm, hideForm } from '../../../store/features/pages/adminSlice';
import EditHouse from "../edit/EditHouse";
// import ErrorMessage from "../../../components/ErrorMessage";
import LoadingSpinner from '../../../components/LoadingSpinner'
import { setNotification } from "../../../store/features/notification/notificationSlice";



export default function HouseList() {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.adminPage.formState);
  const houses = useSelector((state) => state.houses.data);
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(fetchHousesAsync());
  }, [dispatch]);

  const handleDeleteHouse = (houseId) => {
    const houseName = houses.find(a => a.id === houseId).name;
    try {
      dispatch(deleteHouseAsync(houseId));
      dispatch(setNotification({
        message: `Дом ${houseName} удалена.`,
        type: 'success',
      }));
    } catch (e) {
      dispatch(setNotification({
        message: `Ошибка при удалении дома ${houseName}. 
        ${e.message}`,
        type: 'error',
      }))
      console.log(e);
    }
  }

  const handleAddHouse = () => {
    dispatch(showForm({ type: 'add', itemId: null }))
  }

  const handleEditHouse = (houseId) => {
    dispatch(showForm({ type: 'edit', itemId: houseId }))
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner/>
      ) : formState.isOpen && formState.type === 'add' ? (
        <AddHouseForm
          onCancel={() => dispatch(hideForm())}
        />
      ) : formState.isOpen && formState.type === 'edit' ? (
        <EditHouse
          houseId={formState.itemId}
          onCancel={() => dispatch(hideForm())}
        />
      ) : (
        <div className="houses__list">
          <div className="houses__list-top">
            <p>Список домов</p>
            <button onClick={handleAddHouse}
              className="houses__list-add">
              Добавить
            </button>
          </div>
          {houses.length > 0 ? (
            houses.map((house) => (
              <HouseItem
                key={house.id}
                house={house}
                onEdit={() => handleEditHouse(house.id)}
                onDelete={() => handleDeleteHouse(house.id)}
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
