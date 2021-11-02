export interface IUser {
  _id?: string
  username?: string
  password?: string
  upvotes?: Map<string, number>
  downvotes?: Map<string, number>
  refreshToken?: string
  reputation?: number
  numberOfPosts?: number
  iconPath?: string
  __v?: number
}
