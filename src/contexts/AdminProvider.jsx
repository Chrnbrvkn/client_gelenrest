import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useApiData } from './ApiProvider';

const AdminContext = createContext()

export default function AdminProvider({ children }) {


  // данные о бронировании
  const { fetchDataBooking } = useApiData()
  useEffect(() => {
    fetchDataBooking();
  }, [fetchDataBooking]);

  const [viewState, setViewState] = useState('none');

  const [selectedItem, setSelectedItem] = useState(null);


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
      case 'booking':
        fetchDataBooking()
        break;
      case 'house':
        fetchDataHouses()
        break;
      case 'apart':
        fetchDataAparts()
        break;
      case 'room':
        fetchDataRooms()
        break;

      default:
        break;
    }
  }, [editType]);

  const handleSelectedTable = useCallback((table) => {
    setSelectedTable(table);
    setShowForm({
      booking: false,
      house: false,
      room: false,
      apart: false,
    });
    setContent("list");
  }, []);

  const toggleForm = useCallback((type) => {
    setShowForm(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  }, []);
  const adminContextValue = useMemo(() => ({
    viewState,
    setViewState,
    selectedItem,
    setSelectedItem,

    selectedTable,
    showForm,
    content,
    editId,
    editType,
    handleEdit,
    handleEditSubmit,
    handleSelectedTable,
    toggleForm

  }), [
    viewState,
    selectedItem,
    selectedTable,
    showForm,
    content,
    editId,
    editType,
    handleEdit,
    handleEditSubmit,
    handleSelectedTable,
    toggleForm
  ]);

  return (
    <AdminContext.Provider value={adminContextValue}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
