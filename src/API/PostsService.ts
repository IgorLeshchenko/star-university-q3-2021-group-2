import { AxiosResponse } from 'axios'

import { ICreatePostRequest } from '../models/CreatePostRequest'
import { IPostsParams, ISinglePostResult } from '../models/SinglePostResult'

import { api } from './index'

const url = `/posts`

export class PostsService {
  static async addPost(post: ICreatePostRequest): Promise<AxiosResponse<number>> {
    return api.post(url, post)
  }

  static async getSinglePost(id: string): Promise<AxiosResponse<ISinglePostResult>> {
    return api.get<ISinglePostResult>(`${url}/${id}`)
  }

  static async getPostsNumber(): Promise<AxiosResponse<{ result: number }>> {
    return api.get<{ result: number }>(`${url}-number`)
  }

  static async upvotePost(id: string): Promise<AxiosResponse<boolean>> {
    return api.post(`${url}/${id}/upvote`)
  }

  static async downvotePost(id: string): Promise<AxiosResponse<boolean>> {
    return api.post(`${url}/${id}/downvote`)
  }

  static async removeReaction(id: string): Promise<AxiosResponse> {
    return api.post(`${url}/${id}/remove-reactions`)
  }

  static async getPosts(params: IPostsParams): Promise<AxiosResponse<ISinglePostResult[]>> {
    const parameters = JSON.parse(JSON.stringify(params))
    // checking for possible undefined values
    const queryParams = Object.keys(parameters).reduce((acc: string[], key) => {
      if (parameters[key] !== undefined) {
        const e = `${key}=${parameters[key]}`
        acc.push(e)
      }
      return acc
    }, [])
    return api.get<ISinglePostResult[]>(`${url}?${queryParams.join('&')}`)
  }
}
