export type ISortParams = 'recent' | 'most-upvotes' | 'oldest' | 'default'

export interface ISinglePostResult {
  title: string
  body: string
  children?: ISinglePostResult[]
  date: string
  author: string
  upvotes: number
  __v: number
  _id: string
  level?: number
  parent?: string
}

export interface ISinglePost extends ISinglePostResult {
  countChildren: number
}

export interface IPostsParams {
  page?: number
  number?: number
  sort?: ISortParams
  parent?: string
  returnWithComments?: boolean
  search?: string
}
