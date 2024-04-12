import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../../components/Container/Container'
import { IMAGE_MAX_SIZE_IN_BYTES, MENU_PATHS } from '../../const'
import { parseFileToBase64 } from '../../utils'
import { userService } from '../../services/users'
import { type User } from '../../type'

export const RegisterUser: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string, type: string } | null>(null)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleUserRegistration = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
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

    if (password.length < 8 || confirmPassword.length < 8) {
      setNotification({
        message: 'La contraseña debe tener al menos 8 caracteres',
        type: 'error'
      })
      return
    }

    if (password !== confirmPassword) {
      setNotification({
        message: 'Las contraseñas no coinciden',
        type: 'error'
      })
      return
    }

    const base64Image = imageFile.size > 0 ? await parseFileToBase64(imageFile) : ''
    userData.photo = base64Image

    const user: User = {
      name: userData.name as string,
      email: userData.email as string,
      password: userData.password as string,
      photo: userData.photo,
      books: []
    }
    setIsLoading(true)
    const response = await userService.createUser(user)
    if (response.error !== undefined) {
      setNotification({
        message: response.error,
        type: 'error'
      })
    } else {
      setNotification({
        message: 'Usuario registrado exitosamente',
        type: 'success'
      })
      setPassword('')
      setConfirmPassword('')
      target.reset()
    }

    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setIsLoading(false)
  }

  return (
    <>
      <Container>
        <h1>Registro de Usuarios</h1>
        <div className='login'>
          <form onSubmit={handleUserRegistration}>
            <label>
              <p>Nombre</p>
              <input type="text" required autoComplete='name' name="name" />
            </label>
            <label>
              <p>Correo</p>
              <input type="email" required autoComplete='email' name="email" />
            </label>
            <label>
              <p>Contraseña</p>
              <input
                minLength={8}
                type="password"
                required
                name="password"
                value={password}
                onChange={({ target }) => { setPassword(target.value) }}
              />
            </label>
            <label>
              <p>Confirmar contraseña</p>
              <input
                minLength={8}
                type="password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={({ target }) => { setConfirmPassword(target.value) }}
              />
            </label>

            <label>
              <p>Foto</p>
              <input type="file" name="image" accept=".jpg, .jpeg, .png" />
            </label>
            {notification !== null && <small className={notification.type} >{notification.message}</small>}
            <button className='button btn-primary' type="submit">Registrar</button>
            {isLoading && <p>Cargando...</p>}

            <label>
              <p>¿Ya tienes cuenta?</p>
              <Link to={MENU_PATHS.LOGIN}>Iniciar Sesión</Link>
            </label>
          </form>
        </div>
      </Container>
    </>
  )
}
