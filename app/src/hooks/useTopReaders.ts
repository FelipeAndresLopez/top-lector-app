import { useEffect, useState } from 'react'
import { userService } from '../services/users'
import { type UserId, type User } from '../type'

type GetUsers = () => { users: User[] }
export const useGetUsers: GetUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    userService.getUsers()
      .then((data: User[]) => {
        setUsers(data)
      })
      .catch(error => {
        throw new Error(`Error getting top readers ${error}`)
      })
  }, [])

  return { users }
}

type GetUserById = ({ userId }: { userId: UserId }) => {
  userInfo: User
  setUserInfo: React.Dispatch<React.SetStateAction<User>>
}

export const useGetUserInfo: GetUserById = ({ userId }) => {
  const [userInfo, setUserInfo] = useState<User>({
    id: 0,
    name: '',
    email: '',
    password: '',
    photo: '',
    books: []
  })

  useEffect(() => {
    userService.getUserById({ userId })
      .then((data: User) => {
        setUserInfo(data)
      })
      .catch(error => {
        throw new Error(`Error getting user info ${error}`)
      })
  }, [])

  return { userInfo, setUserInfo }
}
