import { createSlice } from '@reduxjs/toolkit';
import { fetchAllRoomsAsync, fetchRoomsAsync, deleteRoomPictureAsync, deleteRoomAsync } from './roomsFetch';



const initialState = {
  allRooms: [],
  roomsByHouseId: {},
  status: 'idle',
  error: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoomsAsync.fulfilled, (state, action) => {
        const rooms = action.payload;
        state.allRooms = [...rooms];
      })
      .addCase(fetchRoomsAsync.fulfilled, (state, action) => {
        const { houseId, roomsWithImages } = action.payload;
        state.roomsByHouseId[houseId] = roomsWithImages;
        const combinedRooms = [...state.allRooms, ...roomsWithImages];
        state.allRooms = combinedRooms.filter((room, index, self) => {
          return index === self.findIndex((t) => t.id === room.id);
        });
      })
      .addCase(deleteRoomAsync.fulfilled, (state, action) => {
        const { roomId, houseId } = action.meta.arg;
        if (state.roomsByHouseId[houseId]) {
          state.roomsByHouseId[houseId] = state.roomsByHouseId[houseId].filter(room => room.id !== roomId);
        }
        state.allRooms = state.allRooms.filter(room => room.id !== roomId);
      })
      .addCase(deleteRoomPictureAsync.fulfilled, (state, action) => {
        const { roomId, imageId } = action.meta.arg;
        // поиск комнаты  по houseId
        for (const houseId in state.roomsByHouseId) {
          const rooms = state.roomsByHouseId[houseId];
          const roomIndex = rooms.findIndex(room => room.id === roomId);
          if (roomIndex !== -1) {

            rooms[roomIndex].images = rooms[roomIndex].images.filter(image => image.id !== imageId);
            break;
          }
        }
      });
    ;
  },
});

export default roomsSlice.reducer;
