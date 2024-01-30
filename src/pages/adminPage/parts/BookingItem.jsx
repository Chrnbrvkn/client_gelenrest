import React, { useEffect, useState } from 'react'
import { getApart } from '../../../api/apartsApi'
import { getRoom } from '../../../api/roomsApi'
import { useAdmin } from '../../../contexts/AdminProvider'

export default function BookingItem({ handleEdit, booking, onDelete }) {

  const TYPE = 'booking'
  const handleClickEdit = () => {
    handleEdit(booking.id, TYPE)
  }
  const {
    viewState,
    setViewState,
    selectedItem,
    setSelectedItem
  } = useAdmin();

  const [bookingItem, setBookingItem] = useState({})

  const fetchItem = async () => {
    if (selectedItem) {
      if (booking.itemType === 'room' && selectedItem.houseId) {
        const fetchedItem = await getRoom(selectedItem.itemId, selectedItem.houseId)
        setBookingItem(fetchedItem)
      }
      if (booking.itemType === 'apart' && selectedItem.itemId) {
        const fetchedItem = await getApart(selectedItem.itemId)
        setBookingItem(fetchedItem)
      }
    } else {
      console.log("Selected item is not set yet");
    }
  }

  useEffect(() => {
    fetchItem()
  }, [])

  return (
    <div key={booking.id} className="houses__list-item--content">
      <a className="houses__list-item">
        {bookingItem.name ? bookingItem.id : 'Item'}
      </a>
      <div className="home__redact-buttons">
        <button
          className="houses__list-update"
          onClick={handleClickEdit}
        >Изменить</button>
        <button
          className="houses_list-delete"
          onClick={() => onDelete(booking.id)}
        >Удалить</button>
      </div>
    </div>
  )
}
