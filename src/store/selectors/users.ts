import { RootState } from '../store'

export const selectUser = ({ user }: RootState) => user.user
export const selectUserReactions = ({ user }: RootState) => user.reactions
