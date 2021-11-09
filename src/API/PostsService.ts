import { AxiosResponse } from 'axios'

import { ICreatePostRequest } from '../models/CreatePostRequest'
import { IPostsParams, ISinglePostResult } from '../models/SinglePostResult'

import { api } from './index'

const url = `/posts`

export class PostsService {
  static async addPost(post: ICreatePostRequest): Promise<AxiosResponse<number>> {
    return api
      .post(url, post)
      .then((response) => response)
      .catch((error) => error.response)
  }

  static async getSinglePost(id: string): Promise<AxiosResponse<ISinglePostResult>> {
    return api
      .get<ISinglePostResult>(`${url}/${id}`)
      .then((response) => response)
      .catch((error) => error.response)
  }

  static async getPostsNumber(): Promise<AxiosResponse<{ result: number }>> {
    return api
      .get<{ result: number }>(`${url}-number`)
      .then((response) => response)
      .catch((error) => error.response)
  }

  static async upvotePost(id: string): Promise<AxiosResponse<boolean>> {
    return api
      .post(`${url}/${id}/upvote`)
      .then((response) => response)
      .catch((error) => error.response)
  }

  static async downvotePost(id: string): Promise<AxiosResponse<boolean>> {
    return api
      .post(`${url}/${id}/downvote`)
      .then((response) => response)
      .catch((error) => error.response)
  }

  static async removeReaction(id: string): Promise<AxiosResponse> {
    return api
      .post(`${url}/${id}/remove-reactions`)
      .then((response) => response)
      .catch((error) => error.response)
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
    return api
      .get<ISinglePostResult[]>(`${url}?${queryParams.join('&')}`)
      .then((response) => response)
      .catch((error) => error.response)
  }
}
