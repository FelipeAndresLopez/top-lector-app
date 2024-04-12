import { Navigate } from 'react-router-dom'
import { MENU_PATHS } from '../../const'
import { isUserLogged } from '../../utils'

interface Props {
  component: React.FC
}

export const PrivateRoute: React.FC<Props> = ({ component: Component }) => {
  return isUserLogged() ? <Component /> : <Navigate to={MENU_PATHS.HOME} />
}
