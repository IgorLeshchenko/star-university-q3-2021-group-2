import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PostsService } from '../API/PostsService'
import { toastError } from '../components/Toast/ErrorToast'
import { toasterService } from '../components/Toast/ToastService'
import { IPostsParams, ISinglePostResult, ISortParams } from '../models/SinglePostResult'
import { DEFAULT_ERROR_MESSAGE, POSTS_PER_PAGE } from '../utils/constants'

import { AppDispatch } from './store'

interface IPostsState {
  data: ISinglePostResult[]
  pagesAmount: number
  sort: ISortParams
  currentPage: number
  isLoading: boolean
  search: string
}

const initialState = {
  data: [],
  pagesAmount: 0,
  sort: 'recent',
  currentPage: 1,
  isLoading: false,
  search: '',
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
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.data = []
      state.currentPage = 1
      state.search = action.payload
    },
    clearPostsData: () => initialState,
  },
})

export const { addPosts, setPagesAmount, setSortType, setCurrentPage, setIsLoading, clearPostsData, setSearchValue } =
  postsSlice.actions

export const loadPostsList = (params: IPostsParams) => (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))
  return PostsService.getPosts(params)
    .then((res) => {
      dispatch(addPosts(res.data))
    })
    .catch(() => {
      toasterService.error({
        title: 'Posts list',
        content: DEFAULT_ERROR_MESSAGE,
      })
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

export const loadPagesNumber = () => (dispatch: AppDispatch) => {
  return PostsService.getPostsNumber().then((res) =>
    dispatch(setPagesAmount(Math.ceil(res.data.result / POSTS_PER_PAGE))),
  )
}

export const getPostUpvotes = (id: string, setUpdatedVotes: React.Dispatch<React.SetStateAction<number>>) => () => {
  return PostsService.getSinglePost(id).then((res) => setUpdatedVotes(res.data.upvotes))
}

export const removePostReactions =
  (id: string, setUpdatedVotes: React.Dispatch<React.SetStateAction<number>>) => (dispatch: AppDispatch) => {
    return PostsService.removeReaction(id)
      .then(() => dispatch(getPostUpvotes(id, setUpdatedVotes)))
      .catch((error) => toastError(error.status, error.response?.data))
  }

export const upvotePost =
  (id: string, setUpdatedVotes: React.Dispatch<React.SetStateAction<number>>) => (dispatch: AppDispatch) => {
    return PostsService.upvotePost(id)
      .then(() => dispatch(getPostUpvotes(id, setUpdatedVotes)))
      .catch((error) => toastError(error.status, error.response?.data))
  }

export const downvotePost =
  (id: string, setUpdatedVotes: React.Dispatch<React.SetStateAction<number>>) => (dispatch: AppDispatch) => {
    return PostsService.downvotePost(id)
      .then(() => dispatch(getPostUpvotes(id, setUpdatedVotes)))
      .catch((error) => toastError(error.status, error.response?.data))
  }
