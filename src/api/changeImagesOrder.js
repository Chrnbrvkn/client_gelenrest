import axiosJson from './axiosJson'

export const changeImagesOrder = async (images, itemId, type) => {
  try {

    const response = await axiosJson.post(`/${type}/${itemId}/changeOrder`, {images: images})

    console.log(response);
    return response.data
  } catch (e) {
    console.error(e)
  }
}