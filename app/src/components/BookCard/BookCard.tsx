import { type Book } from '../../type'
import './styles.css'
import bookPlaceholder from '../../assets/book-placeholder.png'

interface Props {
  book: Book
  className?: string
  children?: React.ReactNode
}

export const BookCard: React.FC<Props> = ({
  book: { id, title, author, rating, userComment },
  className = '',
  children
}) => {
  return (
    <li className={`book-card ${className}`} key={id}>

      <div className='book-card__content'>
        <div className='book-card__header'>
          <img src={bookPlaceholder} alt="user avatar" />
          <div>
            <h2>{title}</h2>
            <p>{author}</p>
            <small>{'★'.repeat(rating)}</small>

          </div>
          {children}
        </div>
        <div className='book-card__body'>
          <p>{userComment}</p>
        </div>
      </div>
    </li>
  )
}
