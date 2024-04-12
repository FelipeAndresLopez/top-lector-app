import { type ErrorResponse, useRouteError, Link } from 'react-router-dom'
import { Container } from '../../components/Container/Container'
import { MENU_PATHS } from '../../const'

export const NotFound: React.FC = () => {
  const error: ErrorResponse = useRouteError() as ErrorResponse

  return (
    <Container>
      <h1>Oops!</h1>
      <p>Parece que la página que estás buscando no existe.</p>
      <p>
        <i>Error: {error.statusText}</i>
      </p>
      <button className='primary__button'>
        <Link to={MENU_PATHS.HOME}>Volver al inicio</Link>
      </button>
    </Container>
  )
}
