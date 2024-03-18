import axios from 'axios';

const axiosFormData = axios.create({
  baseURL: 'https://api.gelenrest.ru',
});

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
