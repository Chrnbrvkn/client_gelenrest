import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddApartForm from "../add/AddApartForm";
import ApartItem from '../items/ApartItem';
import EmptyListMessage from "../../../components/EmptyListMessage";
import { fetchApartsAsync, deleteApartAsync } from "../../../store/features/lists/aparts/apartsFetch";
import { showForm, hideForm } from '../../../store/features/pages/adminSlice';
import EditApart from '../edit/EditApart';
// import ErrorMessage from '../../../components/ErrorMessage';
import LoadingSpinner from '../../../components/LoadingSpinner'
import { setNotification } from '../../../store/features/notification/notificationSlice';



export default function ApartList() {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.adminPage.formState);
  const aparts = useSelector((state) => state.aparts.data);
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(fetchApartsAsync());
  }, [dispatch]);

  const handleDeleteApart = (apartId) => {
    const apartName = aparts.find(a => a.id === apartId).name;
    try {
      dispatch(deleteApartAsync(apartId));
      dispatch(setNotification({
        message: `Квартира ${apartName} удалена.`,
        type: 'success',
      }));
    } catch (e) {
      dispatch(setNotification({
        message: `Ошибка при удалении квартиры  ${apartName}. 
        ${e.message}`,
        type: 'error',
      }))
      console.log(e);
    }
  };

  const handleAddApart = () => {
    console.log('Adding new apartment');
    dispatch(showForm({ type: 'add', itemId: null }));
  };

  const handleEditApart = (apartId) => {
    console.log('Editing apartment with ID:', apartId);
    dispatch(showForm({ type: 'edit', itemId: apartId }));
  };


  return (
    <>
      {isLoading ? (
        <LoadingSpinner/>
      ) : formState.isOpen && formState.type === 'add' ? (
        <AddApartForm onCancel={() => dispatch(hideForm())} />
      ) : formState.isOpen && formState.type === 'edit' ? (
        <EditApart apartId={formState.itemId} onCancel={() => dispatch(hideForm())} />
      ) : (
        <div className="aparts__list">
          <div className="houses__list-top">
            <p>Список квартир</p>
            <button onClick={handleAddApart}
              className="houses__list-add">
              Добавить
            </button>
          </div>
          {aparts.length > 0 ? (
            aparts.map((apart) => (
              <ApartItem
                key={apart.id}
                apart={apart}
                onEdit={() => handleEditApart(apart.id)}
                onDelete={() => handleDeleteApart(apart.id)}
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
