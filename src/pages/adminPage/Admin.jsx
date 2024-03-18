// import { useState, useEffect, useCallback } from "react"
// import ApartList from "./lists/ApartList"
// import HouseList from "./lists/HouseList"
// import RoomList from "./lists/RoomList"
// import BookingList from "./lists/BookingList"
// import EditForm from './edit/EditForm'

// import { getHouses, deleteHouse } from "../../api/housesApi"
// import { getAparts, deleteApart } from "../../api/apartsApi"
// import { getRooms, deleteRoom } from "../../api/roomsApi"
// import { getBooking } from "../../api/bookingApi"


// import { useAdmin } from "../../contexts/AdminProvider"

// import './admin.css'
// import { useData } from "../../contexts/DataProvider"

// export default function Admin() {
//   const { logout } = useData()
//   const {
//     viewState,
//     setViewState,
//     selectedItem,
//     setSelectedItem
//   } = useAdmin();

//   const [selectedTable, setSelectedTable] = useState('')
//   const [showBookingForm, setShowBookingForm] = useState(false)
//   const [showHouseForm, setShowHouseForm] = useState(false)
//   const [showRoomForm, setShowRoomForm] = useState(false)
//   const [showApartForm, setShowApartForm] = useState(false)

//   const [content, setContent] = useState('list')
//   const [editId, setEditId] = useState(null)
//   const [editType, setEditType] = useState('')
//   const [selectedHouseId, setSelcectedHouseId] = useState(null)
//   const [selectedRoomId, setSelcectedRoomId] = useState(null)

//   const handleSelectHouse = (id) => {
//     setSelcectedHouseId(id)
//     console.log("Выбран дом с ID:", id);
//   }
//   const handleSelectRoom = (id) => {
//     setSelcectedRoomId(id)
//     console.log("Выбрана комната с ID:", id);
//   }

//   const handleSelectedTable = (table) => {
//     setSelectedTable(table);
//     setShowBookingForm(false);
//     setShowHouseForm(false);
//     setShowRoomForm(false);
//     setShowApartForm(false);
//     setContent('list');
//     setSelcectedHouseId(null)
//     setSelcectedRoomId(null)
//     setViewState(null)
//   }

//   const handleEdit = (id, type, houseId) => {
//     setEditId(id)
//     setSelcectedHouseId(houseId)
//     setContent('edit')
//     setEditType(type)
//   }

//   const handleEditSubmit = () => {
//     console.log(editType);
//     setContent('list');
//     if (editType === 'apart') {
//       fetchAparts();
//     } else if (editType === 'house') {
//       fetchHouses();
//     } else if (editType === 'room') {
//       fetchHouses();
//     } else if (editType === 'booking') {
//       fetchBooking();
//     }
//   };

//   const [booking, setBooking] = useState([])
//   const [bookingFormData, setBookingFormData] = useState({})
//   const [houses, setHouses] = useState([])
//   const [houseFormData, setHouseFormData] = useState({})
//   const [aparts, setAparts] = useState([])
//   const [apartFormData, setApartFormData] = useState({})
//   const [roomFormData, setRoomFormData] = useState({})

//   const handleBookingFormChange = (data) => {
//     setBookingFormData(data)
//   }
//   const handleHouseFormChange = (data) => {
//     setHouseFormData(data)
//   }
//   const handleApartFormChange = (data) => {
//     setApartFormData(data)
//   }
//   const handleRoomFormChange = (data) => {
//     setRoomFormData(data)
//   }
//   const fetchBooking = useCallback(async () => {
//     try {
//       const fetchedBooking = await getBooking();
//       setBooking(fetchedBooking);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   const fetchHouses = useCallback(async () => {
//     try {
//       const fetchedHouses = await getHouses();
//       setHouses(fetchedHouses);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   const fetchAparts = useCallback(async () => {
//     try {
//       const fetchedAparts = await getAparts();
//       setAparts(fetchedAparts);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);
//   useEffect(() => {
//     fetchHouses();
//     fetchAparts();
//     // fetchBooking()
//   }, [fetchHouses, fetchAparts, fetchBooking]);


//   const tableComponents = {
//     booking: <BookingList
//       handleEdit={handleEdit}
//       bookingFormData={bookingFormData}
//       onChange={handleBookingFormChange}
//       booking={booking}
//       onFetchBooking={fetchBooking}
//       showBookingForm={showBookingForm}
//       onToggleBookingForm={() => setShowBookingForm(prev => !prev)}
//     />,
//     houses: <HouseList
//       handleEdit={handleEdit}
//       houseFormData={houseFormData}
//       onChange={handleHouseFormChange}
//       houses={houses}
//       onFetchHouses={fetchHouses}
//       showHouseForm={showHouseForm}
//       onToggleHouseForm={() => setShowHouseForm(prev => !prev)}
//     />,
//     apartments: <ApartList
//       handleEdit={handleEdit}
//       apartFormData={apartFormData}
//       onChange={handleApartFormChange}
//       aparts={aparts}
//       onFetchAparts={fetchAparts}
//       showApartForm={showApartForm}
//       onToggleApartForm={() => setShowApartForm(prev => !prev)}
//     />,
//     rooms: <RoomList
//       handleEdit={handleEdit}
//       selectedHouseId={selectedHouseId}
//       handleSelectHouse={handleSelectHouse}
//       handleSelectRoom={handleSelectRoom}
//       roomFormData={roomFormData}
//       onChange={handleRoomFormChange}
//       houses={houses}
//       showRoomForm={showRoomForm}
//       onToggleRoomForm={() => setShowRoomForm(prev => !prev)}
//     />
//   };

//   const renderContent = () => {
//     switch (content) {
//       case 'edit':
//         return <EditForm type={editType} id={editId} houseId={selectedHouseId} onEditSubmit={handleEditSubmit} />;
//       case 'list':
//       default:
//         return (
//           <>{tableComponents[selectedTable]}</>
//         )
//     }
//   }

//   return (
//     <>
//       <h6 className="admin__title">
//         Панель администратора
//       </h6>
//       <div className="container">
//         <button onClick={() => logout()}>Выйти</button>
//         <div className="admin__container">
//           <div className="admin__sidebar">
//             <button onClick={() => handleSelectedTable('booking')} className="admin__sidebar-button">Список броней</button>
//             <button onClick={() => handleSelectedTable('houses')} className="admin__sidebar-button">Список домов</button>
//             <button onClick={() => handleSelectedTable('apartments')} className="admin__sidebar-button">Список квартир</button>
//             <button onClick={() => handleSelectedTable('rooms')} className="admin__sidebar-button">Список комнат</button>
//           </div>
//           <div className="table_items">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

import React, { useState, useCallback } from "react";
import { useApiData } from "../../contexts/ApiProvider";
import { useAdmin } from "../../contexts/AdminProvider";
import { useData } from "../../contexts/DataProvider";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminContent from "./AdminContent";

import "./admin.css";

export default function Admin() {
  const { logout } = useData();
  const { setViewState } = useAdmin();
  const { houses, fetchDataHouses, aparts, fetchDataAparts, rooms, fetchDataRooms, reservedDates, fetchReservedDates } = useApiData();

  const [selectedTable, setSelectedTable] = useState("");
  const [showForm, setShowForm] = useState({
    booking: false,
    house: false,
    room: false,
    apart: false,
  });

  const [content, setContent] = useState("list");
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState("");

  const handleEdit = useCallback((id, type) => {
    setEditId(id);
    setContent("edit");
    setEditType(type);
  }, []);

  const handleEditSubmit = useCallback(() => {
    setContent("list");
    switch (editType) {
      case "apart":
        fetchDataAparts();
        break;
      case "house":
        fetchDataHouses();
        break;
      case "room":
        fetchDataRooms();
        break;
      case "booking":
        fetchReservedDates()
        break;
      default:
        console.error("Unknown edit type");
    }
  }, [editType, fetchDataAparts, fetchDataHouses, fetchDataRooms]);

  const handleSelectedTable = useCallback((table) => {
    setSelectedTable(table);
    setShowForm({
      booking: false,
      house: false,
      room: false,
      apart: false,
    });
    setContent("list");
    setViewState(null);
  }, [setViewState]);

  const toggleForm = useCallback(
    (type) => {
      setShowForm((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    },
    [setShowForm]
  );


  return (
    <>
      <AdminHeader onLogout={logout} />
      <div className="container">
        <div className="admin__container">
          <AdminSidebar onSelectTable={handleSelectedTable} />
          <AdminContent
            content={content}
            selectedTable={selectedTable}
            showForm={showForm}
            toggleForm={toggleForm}
            data={{ houses, aparts, rooms, reservedDates }}
            handleEdit={handleEdit}
            handleEditSubmit={handleEditSubmit}
            editType={editType}
            editId={editId}
          />
        </div>
      </div>
    </>
  );
}
