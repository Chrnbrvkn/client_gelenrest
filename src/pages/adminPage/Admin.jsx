
import React, { useState, useCallback } from "react";
import { useData } from "../../contexts/DataProvider";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminContent from "./AdminContent";

import "./admin.css";

export default function Admin() {
  const { logout } = useData();

  return (
    <>
      <AdminHeader onLogout={logout} />
      <div className="container">
        <div className="admin__container">
          <AdminSidebar />
          <AdminContent />
        </div>
      </div>
    </>
  );
}
