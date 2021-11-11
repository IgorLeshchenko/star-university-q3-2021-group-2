import { RootState } from '../store'

export const selectUser = ({ user }: RootState) => user.user
