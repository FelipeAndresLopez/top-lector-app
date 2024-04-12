import { type User } from '../../type'
import { UserCard } from '../UserCard/UserCard'

interface Props {
  users: User[]
}

export const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul className='home'>
      {users.map(user =>
        <UserCard
          key={user.id}
          user={user}
        />
      )}
    </ul>
  )
}
