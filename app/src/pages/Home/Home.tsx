import { Navigate } from 'react-router-dom'
import { Container } from '../../components/Container/Container'
import { UserList } from '../../components/UserList/UserList'
import { MENU_PATHS } from '../../const'
import { useGetUsers } from '../../hooks/useTopReaders'
import './styles.css'
import { isUserLogged } from '../../utils'

export const Home: React.FC = () => {
  if (isUserLogged()) {
    return <Navigate to={MENU_PATHS.MY_PROFILE} />
  }
  const { users } = useGetUsers()

  const orderedUsers = users.sort((a, b) => b.books.length - a.books.length)
  return (
    <Container>
      <h1>Top Lector</h1>
      <UserList users={orderedUsers} />
    </Container>
  )
}
