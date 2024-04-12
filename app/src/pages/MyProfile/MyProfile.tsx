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
import { type BookId } from '../../type'
import { getUserSessionInfo } from '../../utils'

// styles
import './styles.css'

export const MyProfile: React.FC = () => {
  const { id } = getUserSessionInfo()
  const { userInfo, setUserInfo } = useGetUserInfo({ userId: id })
  const navigate = useNavigate()

  const handleLogout = (): void => {
    localStorage.removeItem('loggedUserTopLectorApp')
    bookService.setSessionToken('')
    navigate(MENU_PATHS.HOME)
  }

  const handleDeleteBook = async (bookId: BookId): Promise<void> => {
    try {
      const response = await bookService.deleteBook({ bookId })
      userInfo.books = userInfo.books.filter(book => book.id !== bookId)
      setUserInfo({ ...userInfo })
      if (response.error !== undefined) {
        console.log(response.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container className='my-profile'>
      <div className='my-profile__header'>
        <button className='link-button' type='button' onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <div className='user-profile'>
        <UserAvatar photo={userInfo.photo} name={userInfo.name} />
        <div className='user-profile__info'>
          <h1 className='user-profile__name'>{userInfo.name}</h1>
        </div>
      </div>
      <h1 className='my-profile__title'>Mis Libros</h1>
      <BookList
        books={userInfo.books}
        onDeleteBook={handleDeleteBook}
        hasDeleteButton
      />
      <Link className='float-button' to={MENU_PATHS.REGISTER_BOOK}>
        +
      </Link>
    </Container>
  )
}
