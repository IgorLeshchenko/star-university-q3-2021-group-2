import { createSlice } from '@reduxjs/toolkit'

import { getUserFromLocalStorage } from '../utils/local-storage'

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
  },
})

export const { login } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
