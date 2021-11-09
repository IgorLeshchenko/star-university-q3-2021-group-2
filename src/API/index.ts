import axios from 'axios'

import { API_URL } from '../utils/constants'
import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/local-storage'

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && originalRequest.url === `${API_URL}/token`) {
      if (getUserFromLocalStorage() !== {}) removeUserFromLocalStorage()
      return Promise.reject(error)
    }
    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      await api.get(`${API_URL}/token`)
      return api.request(originalRequest)
    }
    return Promise.reject(error)
  },
)
