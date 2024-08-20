import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkInDate: null,
  checkOutDate: null,
  guestsCount: null,
};

export const reserveSlice = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    setCheckInDate(state, action) {
      state.checkInDate = action.payload;
    },
    setCheckOutDate(state, action) {
      state.checkOutDate = action.payload;
    },
    setGuestsCount(state, action) {
      state.guestsCount = action.payload;
    },
  },
});

export const { setCheckInDate, setCheckOutDate, setGuestsCount } =
  reserveSlice.actions;

export default reserveSlice.reducer;
