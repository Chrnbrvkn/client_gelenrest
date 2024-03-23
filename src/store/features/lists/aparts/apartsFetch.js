import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAparts, getApartAllImages } from "../../../../api/apartsApi";


export const fetchAparts = createAsyncThunk('aparts/fetchAparts', async () => {
  const response = await getAparts();
  const images = await getApartAllImages();
  return { data: response, images };
});

