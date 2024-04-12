import { BASE_URL } from '../const'
import { type UserId, type User } from '../type'

const USERS_ENDPOINT = 'users'

const getUsers: () => Promise<User[]> = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${USERS_ENDPOINT}`)
    const data = await response.json()

    return data
  } catch (error) {
    throw new Error('Error getting top readers')
  }
}

type CreateUser = (user: User) => Promise<User>

const createUser: CreateUser = async ({ name, email, password, photo }) => {
  try {
    const response = await window.fetch(`${BASE_URL}/${USERS_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        photo
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error creating user')
  }
}

type GetUserById = ({ userId }: { userId: UserId }) => Promise<User>

const getUserById: GetUserById = async ({ userId }) => {
  try {
    const response = await window.fetch(`${BASE_URL}/${USERS_ENDPOINT}/${String(userId)}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting user')
  }
}

export const userService = { getUsers, createUser, getUserById }
