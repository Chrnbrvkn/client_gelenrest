import axios from "axios";
import axiosFormData from "./axiosFormData";


export const getAparts = async () => {
  try {
    const response = await axiosFormData.get("/aparts")
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const getApart = async (apartId) => {
  try {
    const response = await axiosFormData.get(`/aparts/${apartId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const createApart = async (apart) => {
  try {
    const response = await axiosFormData.post("/aparts", apart)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const updateApart = async (apartId, apart) => {
  try {
    const response = await axiosFormData.patch(`/aparts/${apartId}`, apart)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const deleteApart = async (apartId, name) => {
  try {
    const response = await axiosFormData.delete(`/aparts/${apartId}`)
    console.log(`${name} был удалён!`)
    return response
  } catch (e) {
    console.error(e);
  }
}

export const getApartAllImages = async () => {
  try {
    const response = await axiosFormData.get(`/apart/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getApartImages = async (apartId) => {
  try {
    const response = await axiosFormData.get(`/apart/${apartId}/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}
export const getApartOneImage = async (apartId, imageId) => {
  try {
    const response = await axiosFormData.get(`/apart/${apartId}/pictures/${imageId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const uploadApartPictures = async (pictures, apartId) => {
  try {
    const formData = new FormData()
    pictures.map((picture) => {
      formData.append(`apartsPictures`, picture)
    })
    formData.append('apartId', apartId)
    const response = await axiosFormData.post(`/apart/${apartId}/pictures`, formData)
    return response
  } catch (e) {
    console.error(e);
  }
}

export const deleteApartPicture = async (apartId, imageId) => {
  try {
    const response = await axiosFormData.delete(`/apart/${apartId}/pictures/${imageId}`)
    console.log(`Apart picture with ID: ${imageId} was deleted.`);
    return response
  } catch (e) {
    console.error(e);
  }
}