import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { API_URL } = getEnvVariables()

export const projectApi = axios.create({
  baseURL: API_URL
})

projectApi.interceptors.response.use(
  (response) => {
    if (response.headers['authorization']) {
      localStorage.setItem('token', response.headers['authorization']);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.headers['authorization']) {
      localStorage.setItem('token', error.response.headers['authorization']);
    }
    return Promise.reject(error);
  }
);

projectApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token'),
  }
  return config
})