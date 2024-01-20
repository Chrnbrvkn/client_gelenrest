import axios from "axios";


export const sendModalCallback = async (message) => {
  
  try {
    const url = `http://localhost:3000/callback-modal`;
    console.log(message);
    const response = await axios.post(url, {message} );
    console.log(response);

    return response.data; 
  } catch (e) {
    console.error(e)
  }
}