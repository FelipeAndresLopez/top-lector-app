import { BASE_URL, LOGIN_ENDPOINT } from '../const'
import { type UserCredentials, type UserSession } from '../type'

type Login = (Props: UserCredentials) => Promise<UserSession>

const login: Login = async ({ email, password }) => {
  const response = await window.fetch(`${BASE_URL}/${LOGIN_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  const data = await response.json()
  return data
}

export const loginService = { login }
