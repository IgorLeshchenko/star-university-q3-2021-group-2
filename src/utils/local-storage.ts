interface IUserValues {
  username: string
  loggedIn: boolean
}

export const setUserToLocalStorage = (user: IUserValues) => localStorage.setItem('user', JSON.stringify(user))

export const getUserFromLocalStorage = () => JSON.parse(localStorage.getItem('user') || '{}')

export const removeUserFromLocalStorage = () => localStorage.removeItem('user')
