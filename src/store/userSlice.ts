import { createSlice } from '@reduxjs/toolkit'

import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/local-storage'

import { RootState } from './store'

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

export const selectUser = (state: RootState) => state.user.user
