import axios from 'axios';

const axiosJson = axios.create({
  baseURL: 'https://api.gelenrest.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosJson.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosJson;
