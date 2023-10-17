import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { API_URL } = getEnvVariables()

export const authApi = axios.create({
  baseURL: `${API_URL}/auth`
})

authApi.interceptors.response.use(response => {
  localStorage.setItem('token', response.headers['authorization'])
  return response
})