import { useParams } from 'react-router-dom'
import { useGetUserInfo } from '../../hooks/useTopReaders'
import { Container } from '../../components/Container/Container'

import './styles.css'
import { BookList } from '../../components/BookList/BookList'

export const UserDetail: React.FC = () => {
  const { id: userId = '' } = useParams()
  const { userInfo } = useGetUserInfo({ userId })

  return (
    <Container>
      <p>Libros leídos por: <strong>{userInfo.name}</strong> </p>
      <BookList books={userInfo.books} />
    </Container>
  )
}
