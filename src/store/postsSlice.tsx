import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PostsService } from '../API/PostsService'
import { IPostsParams, ISinglePostResult, ISortParams } from '../models/SinglePostResult'
import { POSTS_PER_PAGE } from '../utils/constants'

import { AppDispatch } from './store'

interface IPostsState {
  data: ISinglePostResult[]
  pagesAmount: number
  sort: ISortParams
  currentPage: number
  isLoading: boolean
}

const initialState = {
  data: [],
  pagesAmount: 0,
  sort: 'default',
  currentPage: 1,
  isLoading: false,
} as IPostsState

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<ISinglePostResult[]>) => {
      state.data = [...state.data, ...action.payload]
    },
    setPagesAmount: (state, action: PayloadAction<number>) => {
      state.pagesAmount = action.payload
    },
    setSortType: (state, action: PayloadAction<ISortParams>) => {
      state.data = []
      state.sort = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { addPosts, setPagesAmount, setSortType, setCurrentPage, setIsLoading } = postsSlice.actions

export const loadPostsList = (params: IPostsParams) => (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))
  return PostsService.getPosts(params)
    .then((res) => {
      dispatch(addPosts(res.data))
      dispatch(setIsLoading(false))
    })
    .catch(() => {
      dispatch(setIsLoading(false))
    })
}

export const loadPagesNumber = () => (dispatch: AppDispatch) => {
  return PostsService.getPostsNumber().then((res) =>
    dispatch(setPagesAmount(Math.ceil(res.data.result / POSTS_PER_PAGE))),
  )
}
