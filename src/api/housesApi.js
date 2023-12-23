import axios from "axios";


export const getHouses = async () => {
  try {
    const response = await axios.get("https://gelenrest.ru.ru/api/houses")
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const getHouse = async (houseId) => {
  try {
    const response = await axios.get(`https://gelenrest.ru.ru/api/houses/${houseId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const createHouse = async (house) => {
  try {
    const response = await axios.post(
      "https://gelenrest.ru.ru/api/houses",
      house
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export const updateHouse = async (houseId, house) => {
  try {
    console.log(houseId);
    for (let [key, value] of house.entries()) {
      console.log(key, value);
    }
    const response = await axios.patch(
      `https://gelenrest.ru.ru/api/houses/${houseId}`,
      house
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const deleteHouse = async (houseId, name) => {
  try {
    await axios.delete(`https://gelenrest.ru.ru/api/houses/${houseId}`)
    return console.log(`${name} был удалён!`)
  } catch (e) {
    console.error(e);
  }
}

export const getHouseAllImages = async () => {
  try {
    const response = await axios.get(`https://gelenrest.ru.ru/api/house/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getHouseImages = async (houseId) => {
  try {
    const response = await axios.get(`https://gelenrest.ru.ru/api/house/${houseId}/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getHousesOneImage = async (houseId, imageId) => {
  try {
    const response = await axios.get(`https://gelenrest.ru.ru/api/house/${houseId}/pictures/${imageId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const uploadHousePictures = async (pictures, houseId) => {
  console.log("pictures: " + pictures);
  console.log("houseId: " + houseId);

  try {
    const formData = new FormData()
    pictures.map((picture) => {
      formData.append(`housesPictures`, picture)
    })
    formData.append('houseId', houseId)

    await axios.post(`https://gelenrest.ru.ru/api/house/${houseId}/pictures`, formData)
  } catch (e) {
    console.error(e);
  }
}

export const deleteHousePicture = async (houseId, imageId) => {
  try {
    await axios.delete(`https://gelenrest.ru.ru/api/house/${houseId}/pictures/${imageId}`)
    return console.log(`House picture with ID: ${imageId} was deleted.`);
  } catch (e) {
    console.error(e);
  }
}
