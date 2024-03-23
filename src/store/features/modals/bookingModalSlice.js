import { createSlice } from '@reduxjs/toolkit';

export const bookingModalSlice = createSlice({
  name: 'bookingModal',
  initialState: {
    isOpen: false,
    selectedItem: null,
  },
  reducers: {
    openBookingModal: (state, action) => {
      state.isOpen = true;
      state.selectedItem = action.payload;
    },
    closeBookingModal: (state) => {
      state.isOpen = false;
      state.selectedItem = null;
    },
  },
});

export const { openBookingModal, closeBookingModal } = bookingModalSlice.actions;

export default bookingModalSlice.reducer;
