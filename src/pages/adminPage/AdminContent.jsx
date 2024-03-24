import React from 'react';
import { useSelector } from 'react-redux';
import BookingList from "./lists/BookingList";
import HouseList from "./lists/HouseList";
import ApartList from "./lists/ApartList";
import RoomList from "./lists/RoomList";


export default function AdminContent() {
  const { selectedTable } = useSelector((state) => state.adminPage);

  switch (selectedTable) {
    case "броней":
      return <BookingList />;
    case "домов":
      return <HouseList />;
    case "квартир":
      return <ApartList />;
    case "комнат":
      return <RoomList />;
    default:
      return <div>Выберите категорию из списка</div>;
  }
}
