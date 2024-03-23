
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getRooms, getRoomAllImages } from "../../../../api/roomsApi";


export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await getRooms();
  const images = await getRoomAllImages();
  return { data: response, images };
});

