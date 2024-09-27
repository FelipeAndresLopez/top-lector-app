// external
import { Link, useNavigate } from 'react-router-dom'

// hooks
import { useGetUserInfo } from '../../hooks/useTopReaders'

// services
import { bookService } from '../../services/books'

// components
import { Container } from '../../components/Container/Container'
import { BookList } from '../../components/BookList/BookList'
import { UserAvatar } from '../../components/UserAvatar/UserAvatar'

// constants and types and utils
import { MENU_PATHS } from '../../const'
import { getUserSessionInfo } from '../../utils'

// styles
import './styles.css'

export const MyProfile: React.FC = () => {
  const { id } = getUserSessionInfo()
  const { userInfo } = useGetUserInfo({ userId: id })
  const navigate = useNavigate()

  const handleLogout = (): void => {
    localStorage.removeItem('loggedUserTopLectorApp')
    bookService.setSessionToken('')
    navigate(MENU_PATHS.HOME)
  }

  return (
    <Container className='my-profile'>
      <div className='my-profile__header'>
        <Link
          to={MENU_PATHS.EDIT_PROFILE}
          className='link-button'
          state={userInfo}
        >
          Editar perfil
        </Link>
        <button className='link-button' type='button' onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <div className='user-profile'>
        <UserAvatar photo={userInfo.photo} name={userInfo.name} />
        <div className='user-profile__info'>
          <h1 className='user-profile__name'>{userInfo.name}</h1>
          <p className='user-profile__email'>{userInfo.email}</p>
        </div>
      </div>
      <h1 className='my-profile__title'>Mis Libros</h1>
      <BookList
        books={userInfo.books}
        hasActions
      />
      <Link className='float-button' to={MENU_PATHS.REGISTER_BOOK}>
        +
      </Link>
    </Container>
  )
}
