import axios from "axios";


export const sendModalCallback = async (message) => {
  
  try {
    const url = `https://api.gelenrest.ru/callback-modal`;
    console.log(message);
    const response = await axios.post(url, {message} );
    console.log(response);

    return response.data; 
  } catch (e) {
    console.error(e)
  }
}