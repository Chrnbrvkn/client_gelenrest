import { useState, useRef, useCallback, useEffect } from "react"
import { createApart, uploadApartPictures } from "../../../api/apartsApi"
import { useForm } from "react-hook-form"
import EditApart from "./EditApart"
import EditHouse from "./EditHouse"
import EditRoom from "./EditRoom"
import EditBooking from "./EditBooking"

export default function EditForm({ type, id, houseId, onEditSubmit }) {

  const renderEditForm = () => {
    switch (type) {
      case 'booking':
        return (
          <EditBooking id={id} onEditSubmit={onEditSubmit}/>
        )
      case 'house':
        return (
          <EditHouse id={id} onEditSubmit={onEditSubmit}/>
        )
      case 'apart':
        return (
          <EditApart id={id} onEditSubmit={onEditSubmit} />
        )
      case 'room':
        return (
          <EditRoom roomId={id} houseId={houseId} onEditSubmit={onEditSubmit}/>
        )
      default:
        <p>Unknown type!</p>
    }
  }
  return (
    <>
      {renderEditForm()}
    </>
  )
}