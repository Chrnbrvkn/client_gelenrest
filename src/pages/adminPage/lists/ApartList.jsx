

import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddApartForm from "../add/AddApartForm";
import ApartItem from '../items/ApartItem';
import EmptyListMessage from "../../../components/EmptyListMessage";
import { deleteApart } from "../../../api/apartsApi";

export default function ApartList({ aparts, onFetchAparts }) {
  const dispatch = useDispatch();
  const { type, itemId } = useSelector(state => state.tables.formState);

  const handleDeleteApart = useCallback(async (id) => {
    await deleteApart(id);
    onFetchAparts();
  }, [onFetchAparts]);

  const handleShowAddForm = () => dispatch({ type: 'SHOW_FORM', formType: 'add', itemId: null });
  const handleShowEditForm = (id) => dispatch({ type: 'SHOW_FORM', formType: 'edit', itemId: id });
  const handleHideForm = () => dispatch({ type: 'HIDE_FORM' });

  if (type) {
    const initialFormData = type === 'edit' ? aparts.find(apart => apart.id === itemId) : {};
    return (
      <AddApartForm
        initialFormData={initialFormData}
        onFormSubmit={onFetchAparts}
        onCancel={handleHideForm}
        isEditing={type === 'edit'}
      />
    );
  }

  return (
    <div className="aparts__list">

      <div className="houses__list-top">
        <p>Список Квартир</p>
        <button onClick={() => dispatch({ type: 'TOGGLE_FORM', payload: 'apartments' })}
          className="houses__list-add">
          Добавить
        </button>
      </div>
      <button onClick={handleShowAddForm}>Добавить</button>
      {aparts.length ? aparts.map(apart => (
        <ApartItem
          key={apart.id}
          apart={apart}
          onEdit={() => handleShowEditForm(apart.id)}
          onDelete={() => handleDeleteApart(apart.id)}
        />
      )) : <EmptyListMessage />}
    </div>
  );
}
