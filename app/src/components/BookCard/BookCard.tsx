import { BookId, type Book } from '../../type'
import './styles.css'
import bookPlaceholder from '../../assets/book-placeholder.png'
import { IconButton } from '../IconButton/IconButton'
import { TrashCanIcon } from '../TrashCanIcon/TrashCanIcon'
import { EditIcon } from '../EditIcon/EditIcon'
import { bookService } from '../../services/books'
import { getUserSessionInfo } from '../../utils'
import { useGetUserInfo } from '../../hooks/useTopReaders'

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


  const { id: userId } = getUserSessionInfo()
  const { userInfo, setUserInfo } = useGetUserInfo({ userId: userId })

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
            <IconButton handleClick={() => { handleDeleteBook(id) }}>
              <TrashCanIcon />
            </IconButton>

            <IconButton handleClick={() => { handleDeleteBook(id) }}>
              <EditIcon />
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
