import { type Book } from '../../type'
import { BookCard } from '../BookCard/BookCard'

import './styles.css'

interface BookListProps {
  books: Book[]
  hasActions?: boolean
}

export const BookList: React.FC<BookListProps> = ({
  books,
  hasActions = false
}) => {
  return (
    <ul className='book-list'>
      {books.map(book =>

        <BookCard
          key={book.id}
          book={book}
          hasActions={hasActions}
        />
      )}
    </ul>
  )
}
