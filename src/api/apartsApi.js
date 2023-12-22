import axios from "axios";

export const getAparts = async () => {
  try {
    const response = await axios.get("http://45.80.69.128:3000/api/aparts")
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const getApart = async (apartId) => {
  try {
    const response = await axios.get(`http://45.80.69.128:3000/api/aparts/${apartId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const createApart = async (apart) => {
  try {
    const response = await axios.post(
      "http://45.80.69.128:3000/api/aparts",
      apart, { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const updateApart = async (apartId, apart) => {
  try {
    const response = await axios.patch(
      `http://45.80.69.128:3000/api/aparts/${apartId}`,
      apart
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const deleteApart = async (apartId, name) => {
  try {
    await axios.delete(`http://45.80.69.128:3000/api/aparts/${apartId}`)
    return console.log(`${name} был удалён!`)
  } catch (e) {
    console.error(e);
  }
}

export const getApartAllImages = async () => {
  try {
    const response = await axios.get(`http://45.80.69.128:3000/api/apart/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getApartImages = async (apartId) => {
  try {
    const response = await axios.get(`http://45.80.69.128:3000/api/apart/${apartId}/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}
export const getApartOneImage = async (apartId, imageId) => {
  try {
    const response = await axios.get(`http://45.80.69.128:3000/api/apart/${apartId}/pictures/${imageId}`)
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
    await axios.post(`http://45.80.69.128:3000/api/apart/${apartId}/pictures`, formData)
  } catch (e) {
    console.error(e);
  }
}

export const deleteApartPicture = async (apartId, imageId) => {
  try {
    await axios.delete(`http://45.80.69.128:3000/api/apart/${apartId}/pictures/${imageId}`)
    return console.log(`Apart picture with ID: ${imageId} was deleted.`);
  } catch (e) {
    console.error(e);
  }
}