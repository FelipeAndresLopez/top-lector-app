import { Link } from 'react-router-dom'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { type User } from '../../type'
import './styles.css'

interface Props {
  user: User
  className?: string
}

export const UserCard: React.FC<Props> = ({
  user: { id, name, photo, books },
  className = ''
}) => {
  const latestReadBook = books[books.length - 1]
  return (
    <Link to={`/${id}`}>
      <li className={`user-card ${className}`} key={id}>
        <UserAvatar photo={photo} name={name} />
        <div>
          <h2>{name}</h2>
          <p>Leidos: <strong>{books.length}</strong></p>
          {latestReadBook !== undefined && <p>Último libro leído: <strong>{latestReadBook.title}</strong></p>}
        </div>
      </li>
    </Link>
  )
}
