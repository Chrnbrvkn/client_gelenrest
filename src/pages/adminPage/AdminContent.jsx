import BookingList from "./lists/BookingList";
import HouseList from "./lists/HouseList";
import ApartList from "./lists/ApartList";
import RoomList from "./lists/RoomList";
import EditForm from "./edit/EditForm";
import { useSelector } from 'react-redux';


export default function AdminContent() {
  const selectedTable = useSelector((state) => state.tables.selectedTable);
  const showForm = useSelector((state) => state.tables.showForm);

  switch (selectedTable) {
    case "booking":
      return <BookingList showForm={showForm["booking"]} />;
    case "houses":
      return <HouseList showForm={showForm["houses"]} />;
    case "aparts":
      return <ApartList showForm={showForm["aparts"]} />;
    case "rooms":
      return <RoomList showForm={showForm["rooms"]} />;
    default:
      return null;
  }
}
