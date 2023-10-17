import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { API_URL } = getEnvVariables()

export const projectApi = axios.create({
  baseURL: API_URL
})

projectApi.interceptors.response.use(response => {
  localStorage.setItem('token', response.headers['authorization'])
  return response
})

projectApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'Authorization': localStorage.getItem('token')
  }
})