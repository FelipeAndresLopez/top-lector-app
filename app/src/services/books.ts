import { BASE_URL } from '../const'
import { type BookId, type Book } from '../type'
import { getUserSessionInfo } from '../utils'

const BOOKS_ENDPOINT = 'books'

let token: string | null = null

const setSessionToken: (newToken: string) => void = (newToken: string) => {
  token = newToken
}

const getSessionToken = (): string => {
  return getUserSessionInfo()?.token
}

type RegisterBook = (book: Book) => Promise<Book>

export const registerBook: RegisterBook = async ({ title, author, rating, userComment }) => {
  token = getSessionToken()
  try {
    const response = await window.fetch(`${BASE_URL}/${BOOKS_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        author,
        rating,
        userComment
      })
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error registering book')
  }
}

type DeleteBook = ({ bookId }: { bookId: BookId }) => Promise<Book>

const deleteBook: DeleteBook = async ({ bookId }) => {
  token = getSessionToken()
  try {
    const response = await window.fetch(`${BASE_URL}/${BOOKS_ENDPOINT}/${String(bookId)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return await response.json()
  } catch (error) {
    throw new Error('Error deleting book')
  }
}

export const bookService = { registerBook, deleteBook, setSessionToken }
