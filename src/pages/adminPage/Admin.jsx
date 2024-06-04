
import "./admin.css";
import React, { useEffect } from "react";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminContent from "./AdminContent";

import { logout } from "../../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchAllRoomsAsync } from "src/store/features/lists/rooms/roomsFetch";
import { fetchApartsAsync } from "src/store/features/lists/aparts/apartsFetch";
import { fetchHousesAsync } from "src/store/features/lists/houses/housesFetch";
import { fetchBookingAsync } from "src/store/features/lists/booking/bookingFetch";


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


  useEffect(() => {
    dispatch(fetchAllRoomsAsync());
    dispatch(fetchApartsAsync());
    dispatch(fetchHousesAsync());
    dispatch(fetchBookingAsync());
  }, [dispatch]);

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
