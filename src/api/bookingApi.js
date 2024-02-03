import axios from "axios";

export const getBooking = async () => {
  try {
    const response = await axios.get("https://api.gelenrest.ru/booking")
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const getOneBooking = async (bookingId) => {
  try {
    const response = await axios.get(`https://api.gelenrest.ru/booking/${bookingId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const createBooking = async (booking) => {
  try {
    console.log("Sending booking data to server:", booking);
    const response = await axios.post(
      "https://api.gelenrest.ru/booking",
      booking, { headers: { 'Content-Type': 'application/json' } }
    )
    console.log("Server response:", response.data);
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const updateBooking = async (bookingId, booking) => {
  try {
    const response = await axios.patch(
      `https://api.gelenrest.ru/booking/${bookingId}`,
      booking
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const deleteBooking = async (bookingId) => {
  try {
    await axios.delete(`https://api.gelenrest.ru/booking/${bookingId}`)
    return console.log(`Booking was deleted`)
  } catch (e) {
    console.error(e);
  }
}