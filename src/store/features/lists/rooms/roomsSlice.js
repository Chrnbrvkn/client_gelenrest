import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllRoomsAsync,
  fetchRoomsAsync,
  deleteRoomPictureAsync,
  deleteRoomAsync,
} from "./roomsFetch";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoomsAsync.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchRoomsAsync.fulfilled, (state, action) => {
        const { houseId, roomsWithImages } = action.payload;
        state.data = state.data.filter((room) => room.houseId !== houseId);
        state.data = [...state.data, ...roomsWithImages];
      })
      .addCase(deleteRoomAsync.fulfilled, (state, action) => {
        const { roomId } = action.meta.arg;
        state.data = state.data.filter((room) => room.id !== roomId);
      })
      .addCase(deleteRoomPictureAsync.fulfilled, (state, action) => {
        const { roomId, imageId } = action.meta.arg;
        const room = state.data.find((room) => room.id === roomId);
        if (room && room.images) {
          room.images = room.images.filter((image) => image.id !== imageId);
        }
      });
  },
});

export default roomsSlice.reducer;
