import { AxiosResponse } from 'axios'

import { ICreateUserRequest } from '../models/CreateUserRequest'
import { CONTENT_TYPE } from '../utils/enums'

import { api } from './index'

export class AuthService {
  static async signUp({ username, password }: ICreateUserRequest): Promise<AxiosResponse> {
    return api
      .post(
        `/users`,
        { username, password },
        {
          headers: {
            'Content-type': CONTENT_TYPE.APPLICATION_JSON,
          },
        },
      )
      .then((response) => response)
      .catch((error) => error.response)
  }

  static async login({ username, password }: ICreateUserRequest): Promise<AxiosResponse> {
    return api
      .post(
        `/login`,
        { username, password },
        {
          headers: {
            'Content-type': CONTENT_TYPE.APPLICATION_JSON,
          },
        },
      )
      .then((response) => response)
      .catch((error) => error.response)
  }
}
