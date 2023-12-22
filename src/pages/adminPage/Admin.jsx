import { useState, useEffect, useCallback } from "react"
import ApartList from "./parts/ApartList"
import HouseList from "./parts/HouseList"
import RoomList from "./parts/RoomList"
import EditForm from './parts/EditForm'
import { getHouses, deleteHouse } from "../../api/housesApi"
import { getAparts, deleteApart } from "../../api/apartsApi"
import { getRooms, deleteRoom } from "../../api/roomsApi"
import './admin.css'

export default function Admin() {
  const [selectedTable, setSelectedTable] = useState('')
  const [showHouseForm, setShowHouseForm] = useState(false)
  const [showRoomForm, setShowRoomForm] = useState(false)
  const [showApartForm, setShowApartForm] = useState(false)

  const [content, setContent] = useState('list')
  const [editId, setEditId] = useState(null)
  const [editType, setEditType] = useState('')
  const [selectedHouseId, setSelcectedHouseId] = useState(null)
  const [selectedRoomId, setSelcectedRoomId] = useState(null)

  const handleSelectHouse = (id) => {
    setSelcectedHouseId(id)
    console.log("Выбран дом с ID:", id);
  }
  const handleSelectRoom = (id) => {
    setSelcectedRoomId(id)
    console.log("Выбрана комната с ID:", id);
  }

  const handleSelectedTable = (table) => {
    setSelectedTable(table);
    setShowHouseForm(false);
    setShowRoomForm(false);
    setShowApartForm(false);
    setContent('list');
    setSelcectedHouseId(null)
    setSelcectedRoomId(null)
  }

  const handleEdit = (id, type, houseId) => {
    setEditId(id)
    setSelcectedHouseId(houseId)
    setContent('edit')
    setEditType(type)
  }

  const handleEditSubmit = () => {
    console.log(editType);
    setContent('list');
    if (editType === 'apart') {
      fetchAparts();
    } else if (editType === 'house') {
      fetchHouses();
    } else if (editType === 'room') {
      fetchHouses();
    }
  };

  const [houses, setHouses] = useState([])
  const [houseFormData, setHouseFormData] = useState({})
  const [aparts, setAparts] = useState([])
  const [apartFormData, setApartFormData] = useState({})
  const [roomFormData, setRoomFormData] = useState({})

  const handleHouseFormChange = (data) => {
    setHouseFormData(data)
  }
  const handleApartFormChange = (data) => {
    setApartFormData(data)
  }
  const handleRoomFormChange = (data) => {
    setRoomFormData(data)
  }
  const fetchHouses = useCallback(async () => {
    try {
      const fetchedHouses = await getHouses();
      setHouses(fetchedHouses);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAparts = useCallback(async () => {
    try {
      const fetchedAparts = await getAparts();
      setAparts(fetchedAparts);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchHouses();
    fetchAparts();
  }, [fetchHouses, fetchAparts]);


  const tableComponents = {
    houses: <HouseList
      handleEdit={handleEdit}
      houseFormData={houseFormData}
      onChange={handleHouseFormChange}
      houses={houses}
      onFetchHouses={fetchHouses}
      showHouseForm={showHouseForm}
      onToggleHouseForm={() => setShowHouseForm(prev => !prev)}
    />,
    apartments: <ApartList
      handleEdit={handleEdit}
      apartFormData={apartFormData}
      onChange={handleApartFormChange}
      aparts={aparts}
      onFetchAparts={fetchAparts}
      showApartForm={showApartForm}
      onToggleApartForm={() => setShowApartForm(prev => !prev)}
    />,
    rooms: <RoomList
      handleEdit={handleEdit}
      selectedHouseId={selectedHouseId}
      handleSelectHouse={handleSelectHouse}
      handleSelectRoom={handleSelectRoom}
      roomFormData={roomFormData}
      onChange={handleRoomFormChange}
      houses={houses}
      showRoomForm={showRoomForm}
      onToggleRoomForm={() => setShowRoomForm(prev => !prev)}
    />,
  };

  const renderContent = () => {
    switch (content) {
      case 'edit':
        return <EditForm type={editType} id={editId} houseId={selectedHouseId} onEditSubmit={handleEditSubmit} />;
      case 'list':
      default:
        return (
          <>{tableComponents[selectedTable]}</>
        )
    }
  }

  return (
    <>
      <h6 className="admin__title">
        Панель администратора
      </h6>
      <div className="container">
        <div className="admin__container">
          <div className="admin__sidebar">
            <button onClick={() => handleSelectedTable('houses')} className="admin__sidebar-button">Список домов</button>
            <button onClick={() => handleSelectedTable('apartments')} className="admin__sidebar-button">Список квартир</button>
            <button onClick={() => handleSelectedTable('rooms')} className="admin__sidebar-button">Список комнат</button>
          </div>
          <div className="table_items">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  )
}