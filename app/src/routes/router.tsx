import { createHashRouter } from 'react-router-dom'
import { App } from '../App.tsx'
import { NotFound } from '../pages/NotFound/NotFound.tsx'
import { Home } from '../pages/Home/Home.tsx'
import { Login } from '../pages/Login/Login.tsx'
import { RegisterUser } from '../pages/RegisterUser/RegisterUser.tsx'
import { UserDetail } from '../pages/UserDetail/UserDetail.tsx'
import { MyProfile } from '../pages/MyProfile/MyProfile.tsx'
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute.tsx'
import { RegisterBook } from '../pages/RegisterBook/RegisterBook.tsx'
import { MENU_PATHS } from '../const.ts'
import { EditProfile } from '../pages/EditProfile/EditProfile.tsx'
import { UserInfoProvider } from '../context/userInfo.tsx'

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/:id',
        element: <UserDetail />

      },
      {
        path: MENU_PATHS.LOGIN,
        element: <Login />
      },
      {
        path: MENU_PATHS.REGISTER_USER,
        element: <RegisterUser />
      }
    ]
  },

  {
    path: MENU_PATHS.MY_PROFILE,
    element: <UserInfoProvider> <PrivateRoute component={MyProfile} />
    </UserInfoProvider>
  },

  {
    path: MENU_PATHS.REGISTER_BOOK,
    element: <PrivateRoute component={RegisterBook} />
  },
  {
    path: MENU_PATHS.EDIT_PROFILE,
    element: <PrivateRoute component={EditProfile} />
  }
])
