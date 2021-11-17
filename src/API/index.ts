import axios from 'axios'
import Cookies from 'js-cookie'

import { API_URL } from '../utils/constants'
import { CONTENT_TYPE } from '../utils/enums'
import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/local-storage'

const baseURL = API_URL

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-type': CONTENT_TYPE.APPLICATION_JSON,
  },
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
      const token = await api.get(`${API_URL}/token`, {
        headers: {
          accesstoken: `${Cookies.get('accessToken')}`,
          refreshtoken: `${Cookies.get('refreshToken')}`,
        },
      })
      await Cookies.set('accessToken', token.headers['accesstoken'])
      return api.request(originalRequest)
    }
    return Promise.reject(error)
  },
)
