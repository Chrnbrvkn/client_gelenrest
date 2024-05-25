import axios from "axios";
import axiosFormData from "./axiosFormData";
import axiosJson from "./axiosJson";


export const getReservedDates = async () => {
  try {
    const response = await axiosFormData.get("/reservedDates")
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export const getBooking = async () => {
  try {
    const response = await axiosFormData.get("/booking")
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const getOneBooking = async (bookingId) => {
  try {
    const response = await axiosFormData.get(`/${bookingId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const createBooking = async (booking) => {
  try {
    console.log("Sending booking data to server:", booking);
    const response = await axiosJson.post("/booking", booking)
    console.log("Server response:", response.data);
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const updateBooking = async (bookingId, booking) => {
  try {
    console.log("SEND TO SERVER ");
    console.log(booking);
    const response = await axiosFormData.patch(`/booking/${bookingId}`, booking)
    console.log("Server response:", response.data);
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const deleteBooking = async (bookingId) => {
  try {
    const response = await axiosFormData.delete(`/booking/${bookingId}`)
    console.log(`Booking was deleted`)
    return response.data
  } catch (e) {
    console.error(e);
  }
}