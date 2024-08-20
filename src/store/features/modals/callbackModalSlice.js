import { createSlice } from "@reduxjs/toolkit";

export const callbackModalSlice = createSlice({
  name: "callbackModal",
  initialState: {
    isOpen: false,
    content: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = callbackModalSlice.actions;

export default callbackModalSlice.reducer;
