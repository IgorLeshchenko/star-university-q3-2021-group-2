import { AxiosResponse } from 'axios'

import { ICreateUserRequest } from '../models/CreateUserRequest'

import { api } from './index'

export class AuthService {
  static async signUp({ username, password }: ICreateUserRequest): Promise<AxiosResponse> {
    return api.post(`/users`, { username, password })
  }

  static async login({ username, password }: ICreateUserRequest): Promise<AxiosResponse> {
    return api.post(`/login`, { username, password })
  }

  static async logout(): Promise<AxiosResponse> {
    return api.delete(`/logout`)
  }
}
