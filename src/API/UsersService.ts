import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

import { IUser } from '../models/User'
import { CONTENT_TYPE } from '../utils/enums'

import { api } from './index'

export class UsersService {
  static async getUserPublicData(username: string): Promise<AxiosResponse<IUser>> {
    const url = `/users/${username}`

    return api.get<IUser>(url)
  }

  static async getUserReactions(username: string): Promise<AxiosResponse<IUser>> {
    const url = `/users/${username}`

    return api.get<IUser>(`${url}/reactions`)
  }

  static async getUserIcon(username: string): Promise<AxiosResponse<IUser>> {
    const url = `/users/${username}`

    return api.get(`${url}/icon`)
  }

  static async setUserIcon(username: string, icon: File): Promise<AxiosResponse> {
    const formData: FormData = new FormData()
    formData.append('image', icon, icon.name)
    const url = `/users/${username}`

    return api.post(`${url}/icon`, formData, {
      headers: {
        'Content-Type': CONTENT_TYPE.FORM_DATA,
        accesstoken: `${Cookies.get('accessToken')}`,
        refreshtoken: `${Cookies.get('refreshToken')}`,
        username: `${Cookies.get('username')}`,
      },
    })
  }
}
