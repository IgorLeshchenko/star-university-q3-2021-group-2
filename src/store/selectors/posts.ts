import { ISinglePostResult, ISortParams } from '../../models/SinglePostResult'
import { RootState } from '../store'

export const selectPosts = ({ posts }: RootState): ISinglePostResult[] => posts.data

export const selectPagesAmount = ({ posts }: RootState): number => posts.pagesAmount

export const selectSortType = ({ posts }: RootState): ISortParams => posts.sort

export const selectCurrentPage = ({ posts }: RootState): number => posts.currentPage

export const selectIsLoading = ({ posts }: RootState): boolean => posts.isLoading

export const selectSearchValue = ({ posts }: RootState): string => posts.search

export const selectIsPostEdited = ({ posts }: RootState): boolean => posts.isEdited
