import axios from "axios";
import axiosFormData from "./axiosFormData";


export const getAllRooms = async () => {
  try {
    const response = await axiosFormData.get(`/rooms`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getRooms = async (houseId) => {
  try {
    const response = await axiosFormData.get(`/rooms/${houseId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const getRoom = async (roomId, houseId) => {
  try {
    const response = await axiosFormData.get(`/rooms/${houseId}/${roomId}`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}
export const createRoom = async (houseId, room) => {
  try {
    const response = await axiosFormData.post(`/rooms/${houseId}`, room)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const updateRoom = async (houseId, roomId, room) => {
  try {
    const response = await axiosFormData.patch(`/rooms/${houseId}/${roomId}`, room
    )
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const deleteRoom = async (houseId, roomId) => {
  try {
    const response = await axiosFormData.delete(`/${houseId}/${roomId}`)
    console.log(`Room with ID: ${roomId} был удалён!`)
    return response
  } catch (e) {
    console.error(e);
  }
}
export const getRoomAllImages = async () => {
  try {
    const response = await axiosFormData.get(`/room/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}
export const getRoomImages = async (roomId) => {
  try {
    const response = await axiosFormData.get(`/room/${roomId}/pictures`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}

export const getRoomOneImage = async (roomId, imageId) => {
  try {
    const response = await axiosFormData.get(`/room/${roomId}/pictures/${imageId}`)
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
    const response = await axiosFormData.post(`/room/${roomId}/pictures`, formData)
    return response
  } catch (e) {
    console.error(e);
  }
}

export const deleteRoomPicture = async (roomId, imageId) => {
  try {
    const response = await axiosFormData.delete(`/room/${roomId}/pictures/${imageId}`)
    console.log(`Picture with ID: ${imageId} was deleted`);
    return response
  } catch (e) {
    console.error(e);
  }
}