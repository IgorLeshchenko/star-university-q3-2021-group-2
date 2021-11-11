import { createSlice } from '@reduxjs/toolkit'

import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/local-storage'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: getUserFromLocalStorage(),
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      removeUserFromLocalStorage()
      state.user = {}
    },
  },
})

export const { login, logout } = userSlice.actions
