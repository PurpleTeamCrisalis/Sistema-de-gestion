import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { API_URL } = getEnvVariables()

export const projectApi = axios.create({
  baseURL: API_URL
})

// projectApi.interceptors.response.use(response => {
//   localStorage.setItem('token', response.headers['authorization'])
//   return response
// }, error => {
//   console.log(error.response.headers['authorization'])
//   localStorage.setItem('token', error.response.headers['authorization'])
// })

// projectApi.interceptors.request.use(config => {
//   config.headers = {
//     ...config.headers,
//     'Content-Type': 'application/json',
//     'authorization': localStorage.getItem('token'),
//     // 'Origin' : 'http://localhost:3000'
//   }
//   return config
// })