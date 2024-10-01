import { useLocation, useNavigate } from 'react-router-dom'
import { Container } from '../../components/Container/Container'
import { BackButton } from '../../components/BackButton/BackButton'
import { bookService } from '../../services/books'
import { MENU_PATHS, RATING } from '../../const'
import { type Notification, type Book } from '../../type'
import { type FormEvent, useState, type ChangeEvent, useEffect } from 'react'
import './styles.css'

export const RegisterBook: React.FC = () => {

  const { state } = useLocation()
  const navigate = useNavigate()
  const isBookUpdate = state

  const [book, setBook] = useState<Book>(state || {
    title: '',
    author: '',
    rating: RATING.NORMAL,
    userComment: ''
  })


  const [star, setStar] = useState(RATING.WORST)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isBookUpdate) {
      setStar(Object.values(RATING).find(rating => rating.value === book.rating) ?? RATING.NORMAL)
    }
  }, [])

  const handleBookRegistration = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const bookData = Object.fromEntries(formData)

    const book: Book = {
      title: bookData.title as string,
      author: bookData.author as string,
      rating: star.value,
      userComment: bookData.userComment as string
    }

    if (isBookUpdate) {
      book.id = state.id
    }

    setIsLoading(true)
    const response = isBookUpdate ? await bookService.updateBook(book) : await bookService.registerBook(book)
    if (response.error !== undefined) {
      setNotification({
        message: response.error,
        type: 'error'
      })
    } else {
      setNotification({
        message: isBookUpdate ? 'Libro actualizado exitosamente' : 'Libro registrado exitosamente',
        type: 'success'
      })
      target.reset()
      setStar(RATING.NORMAL)
    }

    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setIsLoading(false)
    navigate(MENU_PATHS.MY_PROFILE)
  }


  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const userRating = Number(event.target.value)
    const bookRating = Object
      .values(RATING)
      .find(rating => rating.value === userRating)
    setStar(bookRating ?? RATING.BEST)
  }

  return (
    <>
      <Container>
        <h1>Registro de Libros</h1>
        <div className='register-book'>
          <form onSubmit={handleBookRegistration}>
            <label>
              <p>Nombre del libro</p>
              <input
                type='text'
                required
                autoComplete='title'
                name='title'
                value={book.title}
                onChange={e => setBook({ ...book, title: e.target.value })}
              />
            </label>
            <label>
              <p>Autor</p>
              <input
                type='text'
                required
                autoComplete='author'
                name='author'
                value={book.author}
                onChange={e => setBook({ ...book, author: e.target.value })}
              />
            </label>

            <label>
              <p>¿Cuál ha sido esa enseñanza que más te ha impactado 🤯?</p>
              <textarea autoComplete='comment' name='userComment' rows={5} value={book.userComment} onChange={e => setBook({ ...book, userComment: e.target.value })} />
            </label>
            <label >
              <p>Calificación: {star.value}</p>

              <div className='rate'>
                <span className='emoji-rate'>{star.label}</span>
                <input
                  type='range'
                  list='markers'
                  min='1' max='5'
                  value={star.value}
                  name='rate'
                  onChange={handleRatingChange}
                />
                <datalist id='markers'>
                  <option value='1'></option>
                  <option value='2'></option>
                  <option value='3'></option>
                  <option value='4'></option>
                  <option value='5'></option>
                </datalist>
              </div>
            </label>
            {
              notification !== null &&
              <small className={notification.type} >{notification.message}</small>
            }
            {isLoading && <p>Cargando...</p>}
            <br />
            <button className='button btn-primary' type='submit'>{isBookUpdate ? 'Actualizar Libro' : 'Registrar Libro'}</button>
            <BackButton />
          </form>
        </div>
      </Container>
    </>
  )
}
