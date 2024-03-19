import { useState, useCallback } from "react"
import { getAparts, deleteApart } from "../../../api/apartsApi"
import AddApartForm from "../add/AddApartForm"
import ApartItem from '../items/ApartItem'
import EmptyListMessage from "../../../components/EmptyListMessage"

export default function ApartList({
  handleEdit,
  apartFormData,
  onChange,
  aparts,
  onFetchAparts,
  showApartForm,
  onToggleApartForm,
}) {

  const handleDeleteApart = useCallback(async (id, name) => {
    await deleteApart(id, name)
    onFetchAparts()
  }, [onFetchAparts])

  return (
    <>
      {showApartForm ? (
        <AddApartForm
          apartFormData={apartFormData}
          onChange={onChange}
          onApartAdded={onFetchAparts}
          onToggleApartForm={onToggleApartForm}
        />
      ) : (
        <div className="aparts__list">
          <div className="houses__list-top">
            <p>Список Квартир</p>
            <button onClick={() => dispatch({ type: 'TOGGLE_FORM', payload: 'apartments' })}
              className="houses__list-add">
              Добавить
            </button>
          </div>
          {Array.isArray(aparts) ? (
            aparts.length === 0 ? (
              <EmptyListMessage />
            ) : (
              aparts.map(apart => (
                <ApartItem
                  handleEdit={handleEdit}
                  key={apart.id}
                  apart={apart}
                  onDelete={() => handleDeleteApart(apart.id, apart.name)}
                />
              ))
            )
          ) : (
            <div>Список квартир пуст</div>
          )}
        </div>
      )}
    </>
  )
}