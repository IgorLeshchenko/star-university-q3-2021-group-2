import { AxiosResponse } from 'axios'

import { IUser } from '../models/User'
import { CONTENT_TYPE } from '../utils/enums'
import { getUserFromLocalStorage } from '../utils/local-storage'

import { api } from './index'

const user = getUserFromLocalStorage()
const username = user.username
const url = `/user/${username}`

export class UsersService {
  static async getUserPublicData(): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>(url)
  }

  static async getUserReactions(): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>(`${url}/reactions`)
  }

  static async getUserIcon(): Promise<AxiosResponse<IUser>> {
    return api.get(`${url}/icon`)
  }

  static async setUserIcon(icon: File): Promise<AxiosResponse> {
    const formData: FormData = new FormData()
    formData.append('image', icon, icon.name)
    return api.post(`${url}/icon`, formData, {
      headers: {
        'Content-Type': CONTENT_TYPE.FORM_DATA,
      },
    })
  }
}
