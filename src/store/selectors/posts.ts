import { ISinglePostResult, ISortParams } from '../../models/SinglePostResult'
import { RootState } from '../store'

export const selectPosts = (state: RootState): ISinglePostResult[] => state.posts.data

export const selectPagesAmount = (state: RootState): number => state.posts.pagesAmount

export const selectSortType = (state: RootState): ISortParams => state.posts.sort

export const selectCurrentPage = (state: RootState): number => state.posts.currentPage

export const selectIsLoading = (state: RootState): boolean => state.posts.isLoading
