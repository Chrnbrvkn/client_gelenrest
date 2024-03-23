import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'adminPage',
  initialState: {
    selectedTable: null,
    formState: {
      isOpen: false,
      type: null, // 'add' или 'edit'
      itemId: null,
    },
  },
  reducers: {
    setSelectedTable: (state, action) => {
      state.selectedTable = action.payload;
      state.formState = { isOpen: false, type: null, itemId: null };
    },
    showForm: (state, action) => {
      state.formState = {
        isOpen: true,
        type: action.payload.type,
        itemId: action.payload.itemId,
      };
    },
    hideForm: (state) => {
      state.formState = { isOpen: false, type: null, itemId: null };
    },
  },
});


export const { setSelectedTable, showForm, hideForm } = adminSlice.actions;

export default adminSlice.reducer;
