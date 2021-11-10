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
  sort?: 'recent' | 'most-upvotes' | 'oldest'
  parent?: string
  returnWithComments?: boolean
  search?: string
}
