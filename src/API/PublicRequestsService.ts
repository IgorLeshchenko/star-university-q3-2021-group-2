import { AxiosResponse } from 'axios'

import { IUser } from '../models/User'
import { CONTENT_TYPE } from '../utils/enums'

import { api } from './index'

export class PublicRequestsService {
  static async getUserPublicData({ username }: IUser): Promise<AxiosResponse<IUser>> {
    return api
      .get<IUser>(`users/${username}`, {
        headers: {
          'Content-type': CONTENT_TYPE.APPLICATION_JSON,
        },
      })
      .then((response) => response)
      .catch((error) => error.response)
  }
}
