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
    path: '/mi-perfil',
    element: <PrivateRoute component={MyProfile} />
  },

  {
    path: '/registrar-libro',
    element: <PrivateRoute component={RegisterBook} />
  }
])
