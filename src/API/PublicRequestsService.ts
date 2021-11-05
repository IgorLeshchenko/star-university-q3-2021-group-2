import { AxiosResponse } from 'axios'

import { IUser } from '../models/User'

import api from './index'

export default class PublicRequestsService {
  static async getUserPublicData({ username }: IUser): Promise<AxiosResponse<IUser>> {
    return api
      .get<IUser>(`users/${username}`, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then((response) => response)
      .catch((error) => error.response)
  }
}
