import { createSlice } from '@reduxjs/toolkit'

import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/local-storage'

import { UsersService } from './../API/UsersService'
import { AppDispatch } from './store'

type IReactions = {
  downvotes: {
    [key: string]: number
  }
  upvotes: {
    [key: string]: number
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: getUserFromLocalStorage(),
    reactions: {} as IReactions,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      removeUserFromLocalStorage()
      state.user = {}
    },
    setReactions: (state, action) => {
      state.reactions = action.payload
    },
  },
})

export const { login, logout, setReactions } = userSlice.actions

export const getUserReactions = (username: string) => async (dispatch: AppDispatch) => {
  await UsersService.getUserReactions(username).then((res) => dispatch(setReactions(res.data)))
}
