export type ISortParams = 'recent' | 'most-upvotes' | 'oldest' | 'default'

export interface ISinglePostResult {
  title: string
  body: string
  date: string
  author: string
  upvotes: number
  __v: number
  _id: number
  parent?: string
}

export interface IPostsParams {
  page?: number
  number?: number
  sort?: ISortParams
  parent?: string
  returnWithComments?: boolean
  search?: string
}
