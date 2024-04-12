import { type UserSession } from '../type'

export const parseFileToBase64 = async (file: File): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => { resolve(reader.result as string) }
    reader.onerror = error => { reject(error) }
  })
}

type GetUserSessionInfo = () => UserSession

export const getUserSessionInfo: GetUserSessionInfo = () => {
  const loggedUser = localStorage.getItem('loggedUserTopLectorApp')
  return loggedUser !== null ? JSON.parse(loggedUser) : null
}

export const isUserLogged = (): boolean => {
  return getUserSessionInfo() !== null
}
