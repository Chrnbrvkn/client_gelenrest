import { createSlice } from '@reduxjs/toolkit';
import { fetchRoomsAsync } from '../lists/rooms/roomsFetch';


export const adminSlice = createSlice({
  name: 'adminPage',
  initialState: {
    selectedTable: null,
    formState: {
      isOpen: false,
      type: null, // 'add' or 'edit'
      itemId: null,
    },
    selectedHouseId: null,
    rooms: [],
  },
  reducers: {
    setSelectedTable: (state, action) => {
      state.selectedTable = action.payload;
      state.formState = { isOpen: false, type: null, itemId: null };
    },
    setSelectedHouseId: (state, action) => {
      state.selectedHouseId = action.payload;
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
  extraReducers: (builder) => {
    builder.addCase(fetchRoomsAsync.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });
  }
})


export const { setSelectedTable, setSelectedHouseId, showForm, hideForm } = adminSlice.actions;

export default adminSlice.reducer;
