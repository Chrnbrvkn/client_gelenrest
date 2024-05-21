import { combineReducers } from '@reduxjs/toolkit';
import apartsSlice from './features/lists/aparts/apartsSlice';
import housesSlice from './features/lists/houses/housesSlice';
import roomsSlice from './features/lists/rooms/roomsSlice';
import bookingSlice from './features/lists/booking/bookingSlice';
import clientBookingSlice from './features/lists/clientBooking/clientBookingSlice';
import callbackModalSlice from './features/modals/callbackModalSlice';
import bookingModalSlice from './features/modals/bookingModalSlice';
import usersSlice from './features/lists/users/usersSlice';
import authSlice from './features/auth/authSlice';
import adminSlice from './features/pages/adminSlice';
import loadingSlice from './features/loading/loadingSlice';
import errorSlice from './features/errors/errorsSlice';
import notificationSlice from './features/notification/notificationSlice';
import reserveSlice from './features/reserve/reserveSlice';

const rootReducer = combineReducers({
  adminPage: adminSlice,
  booking: bookingSlice,
  clientBooking: clientBookingSlice,
  houses: housesSlice,
  aparts: apartsSlice,
  rooms: roomsSlice,
  users: usersSlice,
  callbackModal: callbackModalSlice,
  bookingModal: bookingModalSlice,
  auth: authSlice,
  loading: loadingSlice,
  error: errorSlice,
  notification: notificationSlice,
  reserve: reserveSlice

});

export default rootReducer;
