import axios from 'axios'

import { API_URL } from '../utils/constants'
import { CONTENT_TYPE } from '../utils/enums'

const baseURL = API_URL

export const api = axios.create({
  baseURL,
  headers: {
    'Content-type': CONTENT_TYPE.APPLICATION_JSON,
  },
})
