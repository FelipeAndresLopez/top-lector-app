import { type FormEvent, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Container } from '../../components/Container/Container'
import { RATING } from '../../const'
import './styles.css'
import { type Notification, type Book } from '../../type'
import { bookService } from '../../services/books'

export const RegisterBook: React.FC = () => {
  const navigate = useNavigate()
  const [star, setStar] = useState(RATING.WORST)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    const response = await bookService.registerBook(book)
    if (response.error !== undefined) {
      setNotification({
        message: response.error,
        type: 'error'
      })
    } else {
      setNotification({
        message: 'Libro registrado exitosamente',
        type: 'success'
      })
      target.reset()
      setStar(RATING.NORMAL)
    }

    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setIsLoading(false)
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
              <input type="text" required autoComplete='title' name="title" />
            </label>
            <label>
              <p>Autor</p>
              <input type="text" required autoComplete='author' name="author" />
            </label>
            <label>
              <p>¿Cuál ha sido esa enseñanza que más te ha impactado 🤯?</p>
              <textarea autoComplete='comment' name="userComment" rows={5} />
            </label>
            <label >
              <p>Calificación: {star.value}</p>

              <div className='rate'>
                <span className='emoji-rate'>{star.label}</span>
                <input
                  type="range"
                  list="markers"
                  min="1" max="5"
                  value={star.value}
                  name="rate"
                  onChange={handleRatingChange}
                />
                <datalist id="markers">
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
                  <option value="4"></option>
                  <option value="5"></option>
                </datalist>
              </div>
            </label>
            {
              notification !== null &&
              <small className={notification.type} >{notification.message}</small>
            }
            {isLoading && <p>Cargando...</p>}
            <br />
            <button className='button btn-primary' type="submit">Registrar</button>
            <button
              className='button btn-secondary'
              onClick={() => { navigate(-1) }}
              type="submit"
            >
              Volver
            </button>
          </form>
        </div>
      </Container>
    </>
  )
}
