import React, { createContext, useContext, useMemo, useState } from 'react'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [viewState, setViewState] = useState('none'); 

  const [selectedItem, setSelectedItem] = useState(null);

  const adminContextValue = useMemo(() => ({
    viewState,
    setViewState,
    selectedItem,
    setSelectedItem
  }), [viewState, selectedItem]);

  return (
    <AdminContext.Provider value={adminContextValue}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
