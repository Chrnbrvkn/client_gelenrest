import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAparts, createApart, updateApart, deleteApart, getApartImages, uploadApartPictures, deleteApartPicture } from '../../../../api/apartsApi';
import { setLoading } from '../../loading/loadingSlice';
import { setErrorMessage } from '../../errors/errorsSlice';

export const fetchApartsAsync = createAsyncThunk(
  'aparts/fetchAparts',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const aparts = await getAparts();
      const apartsWithImages = await Promise.all(aparts.map(async (apart) => {
        const images = await getApartImages(apart.id);
        return { ...apart, images };
      }));
      return apartsWithImages;
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addApartAsync = createAsyncThunk(
  'aparts/addApart',
  async ({ formData, pictures }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const createdApart = await createApart(formData);
      if (pictures.length > 0) {
        await uploadApartPictures(pictures, createdApart.id);
      }

      return createdApart;
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    } finally {
      dispatch(fetchApartsAsync());
      dispatch(setLoading(false));
    }
  }
);


export const updateApartAsync = createAsyncThunk(
  'aparts/updateApart',
  async ({ apartId, formData }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      console.log("formData");
      console.log(formData);
      const updatedApart = await updateApart(apartId, formData);
      return updatedApart;
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    } finally {
      dispatch(fetchApartsAsync());
      dispatch(setLoading(false));
    }
  }
);

export const deleteApartAsync = createAsyncThunk('aparts/deleteApart', async (apartId, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await deleteApart(apartId);
    return apartId
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(fetchApartsAsync());
    dispatch(setLoading(false));
  }
})

export const uploadApartImagesAsync = createAsyncThunk(
  'aparts/uploadApartImages',
  async ({ apartId, pictures }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      if(pictures.length > 0) {
        await uploadApartPictures(pictures, apartId);
      }
      return apartId
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    } finally {
      dispatch(fetchApartsAsync());
      dispatch(setLoading(false));
    }
  }
);


export const deleteApartPictureAsync = createAsyncThunk('aparts/deleteApartPicture', async ({ apartId: apartId, imageId }, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await deleteApartPicture(apartId, imageId);
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(fetchApartsAsync());
    dispatch(setLoading(false));
  }
});