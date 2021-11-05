import axios from 'axios'

import { API_URL } from '../utils/constants'

const baseURL = API_URL

const api = axios.create({
  baseURL,
})

export default api
