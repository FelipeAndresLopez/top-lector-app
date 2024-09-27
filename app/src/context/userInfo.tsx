import { createContext, useState } from 'react';
import { User } from '../type';

interface UserInfoContext {
  userInfo: User
  setUserInfo: React.Dispatch<React.SetStateAction<User>>
}
export const UserInfoContext = createContext<UserInfoContext>({
  userInfo: {
    id: 0,
    name: '',
    email: '',
    password: '',
    photo: '',
    books: []
  },
  setUserInfo: () => { }
});

interface Props {
  children: React.ReactNode
}

export const UserInfoProvider: React.FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<User>({
    id: 0,
    name: '',
    email: '',
    password: '',
    photo: '',
    books: []
  })
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  )
}