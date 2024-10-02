import { BookId, type Book } from '../../type'
import './styles.css'
import bookPlaceholder from '../../assets/book-placeholder.png'
import { IconButton } from '../IconButton/IconButton'
import { TrashCanIcon } from '../TrashCanIcon/TrashCanIcon'
import { EditIcon } from '../EditIcon/EditIcon'
import { bookService } from '../../services/books'
import { useContext } from 'react'
import { UserInfoContext } from '../../context/userInfo'
import { useNavigate } from 'react-router-dom'
import { MENU_PATHS } from '../../const'

interface Props {
  book: Book
  className?: string
  hasActions?: boolean
}

export const BookCard: React.FC<Props> = ({
  book: { id, title, author, rating, userComment },
  className = '',
  hasActions = false,
}) => {


  const { userInfo, setUserInfo } = useContext(UserInfoContext)
  const navigate = useNavigate()

  const handleDeleteBook = async (bookId: BookId): Promise<void> => {
    try {
      if (window.confirm('¿Seguro que quieres borrar este libro?')) {
        const response = await bookService.deleteBook({ bookId })
        userInfo.books = userInfo.books.filter(book => book.id !== bookId)
        setUserInfo({ ...userInfo })
        if (response.error !== undefined) {
          console.log(response.error)
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleEditBook = async (book: Book): Promise<void> => {
    navigate(MENU_PATHS.REGISTER_BOOK, { state: book })
  }

  return (
    <li className={`book-card ${className}`} key={id}>

      <div className='book-card__header'>
        <img src={bookPlaceholder} alt="book cover" />
        <div className='book-card__details'>
          <h2>{title}</h2>
          <p>{author}</p>
          <small>{'★'.repeat(rating)}</small>
        </div>
        {hasActions && (

          <div className='book-card__actions'>

            <IconButton handleClick={() => {
              handleEditBook({
                id,
                title,
                author,
                rating,
                userComment
              })
            }}>
              <EditIcon />
            </IconButton>
            <IconButton handleClick={() => { handleDeleteBook(id) }}>
              <TrashCanIcon />
            </IconButton>
          </div>
        )}
      </div>
      <hr />
      <div className='book-card__body'>
        <p>{userComment}</p>
      </div>

    </li>
  )
}
