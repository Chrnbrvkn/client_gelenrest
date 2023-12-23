import axios from "axios";

export const getAllRooms = async () => {
  try {
    const response = await axios.get(`https://45.80.69.128:3000/api/rooms`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getRooms = async (houseId) => {
  try {
    const response = await axios.get(`https://45.80.69.128:3000/api/rooms/${houseId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const getRoom = async (roomId, houseId) => {
  try {
    const response = await axios.get(`https://45.80.69.128:3000/api/rooms/${houseId}/${roomId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}
export const createRoom = async (houseId, room) => {
  try {
    const response = await axios.post(
      `https://45.80.69.128:3000/api/rooms/${houseId}`,
      room, { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const updateRoom = async (houseId, roomId, room) => {
  try {
    const response = await axios.patch(`https://45.80.69.128:3000/api/rooms/${houseId}/${roomId}`, room
    )
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const deleteRoom = async (houseId, roomId) => {
  try {
    await axios.delete(`https://45.80.69.128:3000/api/rooms/${houseId}/${roomId}`)
    return console.log(`Room with ID: ${roomId} был удалён!`)
  } catch (e) {
    console.error(e);
  }
}
export const getRoomAllImages = async () => {
  try {
    const response = await axios.get(`https://45.80.69.128:3000/api/room/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}
export const getRoomImages = async (roomId) => {
  try {
    const response = await axios.get(`https://45.80.69.128:3000/api/room/${roomId}/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getRoomOneImage = async (roomId, imageId) => {
  try {
    const response = await axios.get(`https://45.80.69.128:3000/api/room/${roomId}/pictures/${imageId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const uploadRoomPictures = async (pictures, roomId) => {
  try {
    const formData = new FormData()
    pictures.map((picture) => {
      formData.append(`roomsPictures`, picture)
    })
    formData.append('roomId', roomId)
    await axios.post(`https://45.80.69.128:3000/api/room/${roomId}/pictures`, formData)
  } catch (e) {
    console.error(e);
  }
}

export const deleteRoomPicture = async (roomId, imageId) => {
  try {
    await axios.delete(`https://45.80.69.128:3000/api/room/${roomId}/pictures/${imageId}`)
    return console.log(`Picture with ID: ${imageId} was deleted`);
  } catch (e) {
    console.error(e);
  }
}