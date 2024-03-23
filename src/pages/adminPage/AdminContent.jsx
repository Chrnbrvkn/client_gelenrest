import React from 'react';
import { useSelector } from 'react-redux';
import BookingList from "./lists/BookingList";
import HouseList from "./lists/HouseList";
import ApartList from "./lists/ApartList";
import RoomList from "./lists/RoomList";
import EditForm from "./edit/EditForm";

export default function AdminContent() {
  const { selectedTable, formState } = useSelector((state) => state.adminPage);

  if (formState.isOpen) {
    return <EditForm formType={formState.type} itemId={formState.itemId} />;
  }

  switch (selectedTable) {
    case "booking":
      return <BookingList />;
    case "houses":
      return <HouseList />;
    case "aparts":
      return <ApartList />;
    case "rooms":
      return <RoomList />;
    default:
      return <div>Выберите категорию из списка</div>;
  }
}
