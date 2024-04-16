import { Container } from "../../components/Container/Container"
import { useLocation } from "react-router-dom"
import { User, UserOptional } from "../../type"
import { userService } from "../../services/users"
import { FormEvent, useState } from "react"
import { IMAGE_MAX_SIZE_IN_BYTES } from "../../const"
import { parseFileToBase64 } from "../../utils"
import { UserAvatar } from "../../components/UserAvatar/UserAvatar"
import { BackButton } from "../../components/BackButton/BackButton"

export const EditProfile: React.FC = () => {


  const { state }: { state: User } = useLocation()
  const [userInfo, setUserInfo] = useState<UserOptional>(state)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string, type: string } | null>(null)



  const handleUserUpdate = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    setNotification(null)
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const userData = Object.fromEntries(formData)
    const imageFile = formData.get('image') as File

    if (imageFile.size >= IMAGE_MAX_SIZE_IN_BYTES) {
      setNotification({
        message: 'La imagen es demasiado grande, por favor seleccione una imagen menor a 100KB',
        type: 'error'
      })
      return
    }


    const base64Image = imageFile.size > 0 ? await parseFileToBase64(imageFile) : ''
    userData.photo = base64Image

    const user: UserOptional = {
      name: userData.name as string,
      email: userData.email as string,
      photo: userData.photo,
    }

    setIsLoading(true)
    const response = await userService.updateUser(user)
    if (response.error !== undefined) {
      setNotification({
        message: response.error,
        type: 'error'
      })
    } else {
      setNotification({
        message: 'Usuario actualizado exitosamente',
        type: 'success'
      })

      setUserInfo({
        name: '',
        email: '',
        photo: '',
      })
      target.reset()
    }

    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setIsLoading(false)
  }

  const handleImageChange = (event: FormEvent<HTMLInputElement>): void => {
    const imageFile = (event.target as HTMLInputElement).files?.[0]
    if (imageFile) {
      setUserInfo({ ...userInfo, photo: URL.createObjectURL(imageFile) })
    }
  }

  return (
    <>
      <Container>
        <h1>Editar mi perfil</h1>
        <div className='login'>
          <form onSubmit={handleUserUpdate}>

            <label>
              <p>Nombre</p>
              <input
                type="text"
                required
                autoComplete='name'
                name="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
            </label>

            <label>
              <p>Correo</p>
              <input
                type="email"
                required
                autoComplete='email'
                name="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
            </label>

            <label>
              <p>Foto</p>
              <input
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
            </label>
            <UserAvatar photo={userInfo.photo} name={userInfo.name} />
            {notification !== null && <small className={notification.type} >{notification.message}</small>}

            {isLoading && <p>Cargando...</p>}
            <button className='button btn-primary' type="submit">Guardar</button>
            <BackButton />

          </form>
        </div>
      </Container>
    </>
  )
}