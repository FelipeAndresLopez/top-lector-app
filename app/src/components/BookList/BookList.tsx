import { type BookId, type Book } from '../../type'
import { BookCard } from '../BookCard/BookCard'
import { TrashCanIcon } from '../TrashCanIcon/TrashCanIcon'

import './styles.css'

interface BookListProps {
  books: Book[]
  onDeleteBook?: (id: BookId) => Promise<void>
  hasDeleteButton?: boolean
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onDeleteBook = () => { },
  hasDeleteButton = false
}) => {
  return (
    <ul className='book-list'>
      {books.map(book =>
        <BookCard
          key={book.id}
          book={book}>
          {hasDeleteButton && <button
            className='icon-button'
            type='button'
            onClick={async () => { await onDeleteBook(book.id) }}
          >
            <TrashCanIcon />
          </button>}
        </BookCard>
      )}
    </ul>
  )
}
