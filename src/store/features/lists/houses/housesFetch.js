import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHouses, createHouse, updateHouse, deleteHouse, getHouseImages, uploadHousePictures, deleteHousePicture } from '../../../../api/housesApi';
import { setLoading } from '../../loading/loadingSlice';
import { setErrorMessage } from '../../errors/errorsSlice';

export const fetchHousesAsync = createAsyncThunk(
  'houses/fetchHouses',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const houses = await getHouses();
      const housesWithImages = await Promise.all(houses
        .map(async (house) => {
          const images = await getHouseImages(house.id);
          return { ...house, images };
        }));
      return housesWithImages;
    } catch (e) {
      dispatch(setErrorMessage(e.message))
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addHouseAsync = createAsyncThunk('houses/addHouse', async ({ formData, pictures }, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const createdHouse = await createHouse(formData);
    if (pictures.length > 0) {
      await uploadHousePictures(pictures, createdHouse.id);
    }
    return createdHouse;
  } catch (e) {
    dispatch(setErrorMessage(e.message))
  } finally {
    dispatch(fetchHousesAsync());
    dispatch(setLoading(false));
  }
});

export const updateHouseAsync = createAsyncThunk('houses/updateHouse', async ({ houseId, formData }, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const updatedHouse = await updateHouse(houseId, formData);
    return updatedHouse;
  } catch (e) {
    dispatch(setErrorMessage(e.message))
  } finally {
    dispatch(fetchHousesAsync());
    dispatch(setLoading(false));
  }
});

export const deleteHouseAsync = createAsyncThunk('houses/deleteHouse', async (houseId, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await deleteHouse(houseId);
    return houseId;
  } catch (e) {
    dispatch(setErrorMessage(e.message))
  } finally {
    dispatch(fetchHousesAsync());
    dispatch(setLoading(false));
  }
});

export const uploadHouseImagesAsync = createAsyncThunk(
  'houses/addHouseImages',
  async ({ houseId, pictures }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      let newImages;
      if (pictures.length > 0) {
        newImages = await uploadHousePictures(pictures, houseId);
      }
      return { houseId, images: newImages.data };
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    } finally {
      dispatch(fetchHousesAsync());
      dispatch(setLoading(false));
    }
  }
);


// export const uploadHouseImagesAsync = createAsyncThunk(
//   'houses/addHouseImages',
//   async ({ houseId, pictures }, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       if (pictures.length > 0) {
//         await uploadHousePictures(pictures, houseId);
//       }
//       return houseId
//     } catch (e) {
//       dispatch(setErrorMessage(e.message))
//     } finally {
//       dispatch(fetchHousesAsync());
//       dispatch(setLoading(false));
//     }
//   }
// );

export const deleteHousePictureAsync = createAsyncThunk(
  'houses/deleteHousePicture',
  async ({ houseId: houseId, imageId }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await deleteHousePicture(houseId, imageId);
    } catch (e) {
      dispatch(setErrorMessage(e.message))
    } finally {
      dispatch(fetchHousesAsync());
      dispatch(setLoading(false));
    }
  }
);