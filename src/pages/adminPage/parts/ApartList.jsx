import { useState, useCallback } from "react"
import { getAparts, deleteApart } from "../../../api/apartsApi"
import AddApartForm from "./AddApartForm"
import ApartItem from './ApartItem'


const EmptyApartListMessage = () => <div>Список Квартир пуст</div>

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
        />
      ) : (
        <div className="aparts__list">
          <div className="houses__list-top">
            <p>Список Квартир</p>
            <button onClick={onToggleApartForm}
              className="houses__list-add">
              Добавить
            </button>
          </div>
          {Array.isArray(aparts) ? (
            aparts.length === 0 ? (
              <EmptyApartListMessage />
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