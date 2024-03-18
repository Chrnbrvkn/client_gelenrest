import BookingList from "./lists/BookingList";
import HouseList from "./lists/BookingList";
import ApartList from "./lists/ApartList";
import RoomList from "./lists/BookingList";
import EditForm from "./edit/EditForm";

export default function AdminContent({ content, selectedTable, showForm, toggleForm, data, handleEdit, handleEditSubmit, editType, editId }) {


  const renderContent = () => {

    switch (content) {
      case "edit":
        return <EditForm type={editType} id={editId} onEditSubmit={handleEditSubmit} />;
      case "list":

        switch (selectedTable) {
          case "booking":
            return <BookingList
              handleEdit={handleEdit}
              showForm={showForm["booking"]}
              onToggleForm={() => toggleForm("booking")}
              data={data}
            />;
          case "houses":
            return <HouseList
              handleEdit={handleEdit}
              showForm={showForm["houses"]}
              onToggleForm={() => toggleForm("houses")}
              data={data}
            />;
            case "aparts":
              return <ApartList
                handleEdit={handleEdit}
                showForm={showForm["aparts"]}
                onToggleForm={() => toggleForm("aparts")}
                data={data}
              />;
          case "rooms":
            return <RoomList
              handleEdit={handleEdit}
              showForm={showForm["rooms"]}
              onToggleForm={() => toggleForm("rooms")}
              data={data}
            />;
          default:
            return null;

        }
      default:
        return null;
    }
  };

  return (
    <div className="table_items">
      {renderContent()}
    </div>
  );
}
