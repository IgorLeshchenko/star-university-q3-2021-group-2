import { AxiosResponse } from 'axios'

import { ICreateUserRequest } from '../models/CreateUserRequest'

import { api } from './index'

export class AuthService {
  static async signUp({ username, password }: ICreateUserRequest): Promise<AxiosResponse> {
    return api
      .post(`/users`, { username, password })
      .then((response) => response)
      .catch((error) => error.response)
  }

  static async login({ username, password }: ICreateUserRequest): Promise<AxiosResponse> {
    return api
      .post(`/login`, { username, password })
      .then((response) => response)
      .catch((error) => error.response)
  }

  static async logout(): Promise<AxiosResponse> {
    return api
      .delete(`/logout`)
      .then((response) => response)
      .catch((error) => error.response)
  }
}
