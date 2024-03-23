
import "./admin.css";
import React, { useState, useCallback, useEffect } from "react";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminContent from "./AdminContent";

import { logout } from "../../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);



  return (
    <>
      <AdminHeader onLogout={handleLogout} />
      <div className="container">
        <div className="admin__container">
          <AdminSidebar />
          <AdminContent />
        </div>
      </div>
    </>
  );
}
