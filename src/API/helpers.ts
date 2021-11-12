import { API_URL } from '../utils/constants'

export const resolveProfileImagePath = (profileName: string): string => {
  return `${API_URL}/users/${profileName}/icon`
}
