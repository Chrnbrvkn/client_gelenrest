import axiosFormData from "./axiosFormData";

export const getUsers = async () => {
  try {
    const response = await axiosFormData.get("/users")
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export const getOneUser = async (userId) => {
  try {
    const response = await axiosFormData.get(`/users/${userId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export const signIn = async (data) => {
  try {
    const response = await axiosFormData.post(`/login`, data)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export const createUser = async (data) => {
  try {
    const response = await axiosFormData.post(`/login`, data)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
// export const registration = async (user) => {
//   try {
//     const response = await axiosInstance.post(`/registration`, user)
//     return response.data
//   } catch (e) {
//     console.error(e)
//   }
// }
