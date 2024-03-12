import axios from 'axios';

const axiosFormData = axios.create({
  baseURL: 'https://api.gelenrest.ru',
});

// const attachToken = () => {
//   const token = localStorage.getItem('jwtToken');
//   if (token) {
//     axiosFormData.defaults.headers.common['authorization'] = `Bearer ${token}`;
//     console.log(axiosFormData.defaults.headers);
//   }
// };

axiosFormData.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosFormData;
