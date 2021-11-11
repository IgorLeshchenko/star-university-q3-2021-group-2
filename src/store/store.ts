import { configureStore } from '@reduxjs/toolkit'

import { postsSlice } from './postsSlice'
import { userSlice } from './userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    posts: postsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
