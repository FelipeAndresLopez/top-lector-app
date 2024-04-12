import { type UserPhoto, type UserName } from '../../type'

import './styles.css'

interface Props {
  photo: UserPhoto
  name: UserName
}

export const UserAvatar: React.FC<Props> = ({ photo, name }) => {
  return (
    photo !== ''
      ? <img src={photo} alt="user photo" className='user-avatar' />
      : <span className='avatar-placeholder' >{name[0]}</span>
  )
}
