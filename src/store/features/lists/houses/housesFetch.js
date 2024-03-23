import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHouses, createHouse, updateHouse, deleteHouse, uploadHousePictures, deleteHousePicture } from '../../../../api/housesApi';
import { setLoading } from '../../loading/loadingSlice';
import { setErrorMessage } from '../../errors/errorsSlice';

export const fetchHousesAsync = createAsyncThunk(
  'houses/fetchHouses',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const houses = await getHouses();
      const housesWithImages = await Promise.all(houses.map(async (house) => {
        const images = await getHouseImages(house.id);
        return { ...house, images };
      }));
      return housesWithImages;
    } catch (e) {
      dispatch(setErrorMessage(e))
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addHouse = createAsyncThunk('houses/addHouse', async (houseData, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const createdHouse = await createHouse(houseData);
    if (houseData.pictures.length > 0) {
      await uploadHousePictures(houseData.pictures, createdHouse.id);
    }
    dispatch(fetchHousesAsync());
    return createdHouse;
  } catch (error) {
    dispatch(setErrorMessage(e))
  } finally {
    dispatch(setLoading(false));
  }
});

export const updateHouseAsync = createAsyncThunk('houses/updateHouse', async ({ houseId, houseData }, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const updatedHouse = await updateHouse(houseId, houseData);
    dispatch(fetchHousesAsync());
    return updatedHouse;
  } catch (error) {
    dispatch(setErrorMessage(e))
  } finally {
    dispatch(setLoading(false));
  }
});

export const deleteHouseAsync = createAsyncThunk('houses/deleteHouse', async (houseId, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await deleteHouse(houseId);
    dispatch(fetchHousesAsync());
    return houseId;
  } catch (error) {
    dispatch(setErrorMessage(e))
  } finally {
    dispatch(setLoading(false));
  }
});

export const addHouseImagesAsync = createAsyncThunk(
  'houses/addHouseImages',
  async ({ houseId, pictures }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await uploadHousePictures(pictures, houseId);
      dispatch(fetchHousesAsync());
      return { houseId, images: response.data };
    } catch (error) {
      dispatch(setErrorMessage(e))
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteHouseImageAsync = createAsyncThunk(
  'houses/deleteHouseImage',
  async ({ houseId, imageId }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await deleteHousePicture(houseId, imageId);
      dispatch(fetchHousesAsync());
      return { houseId, imageId };
    } catch (error) {
      dispatch(setErrorMessage(e))
    } finally {
      dispatch(setLoading(false));
    }
  }
);