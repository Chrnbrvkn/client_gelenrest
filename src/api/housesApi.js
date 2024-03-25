import axiosFormData from "./axiosFormData";


export const getHouses = async () => {
  try {
    const response = await axiosFormData.get(`/houses`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const getHouse = async (houseId) => {
  try {
    const response = await axiosFormData.get(`/houses/${houseId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const createHouse = async (house) => {
  try {
    const response = await axiosFormData.post("/houses", house)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const updateHouse = async (houseId, house) => {
  try {
    const response = await axiosFormData.patch(`/houses/${houseId}`, house)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const deleteHouse = async (houseId, name) => {
  try {
    const response = await axiosFormData.delete(`/houses/${houseId}`)
    console.log(`${name} был удалён!`)
    return response
  } catch (e) {
    console.error(e);
  }
}

export const getHouseAllImages = async () => {
  try {
    const response = await axiosFormData.get(`/house/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getHouseImages = async (houseId) => {
  try {
    const response = await axiosFormData.get(`/house/${houseId}/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getHousesOneImage = async (houseId, imageId) => {
  try {
    const response = await axiosFormData.get(`/house/${houseId}/pictures/${imageId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const uploadHousePictures = async (pictures, houseId) => {
  try {
    const formData = new FormData()
    pictures.map((picture) => {
      formData.append(`housesPictures`, picture)
    })
    formData.append('houseId', houseId)

    const response = await axiosFormData.post(`/house/${houseId}/pictures`, formData)
    return response
  } catch (e) {
    console.error(e);
  }
}

export const deleteHousePicture = async (houseId, imageId) => {
  try {
    const response = await axiosFormData.delete(`/house/${houseId}/pictures/${imageId}`)
    console.log(`House picture with ID: ${imageId} was deleted.`);
    return response
  } catch (e) {
    console.error(e);
  }
}
