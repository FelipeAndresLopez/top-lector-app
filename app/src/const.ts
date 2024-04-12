export const MENU_PATHS = {
  HOME: '/',
  LOGIN: '/iniciar-sesion',
  REGISTER_USER: '/registrar-usuario',
  MY_PROFILE: '/mi-perfil',
  REGISTER_BOOK: '/registrar-libro'
}

export const MENU_ITEMS = [
  {
    name: 'Inicio',
    path: MENU_PATHS.HOME
  },
  {
    name: 'Iniciar Sesión',
    path: MENU_PATHS.LOGIN
  },
  {
    name: 'Registrarse',
    path: MENU_PATHS.REGISTER_USER
  }
]

export const BASE_URL = import.meta.env.VITE_API_URL

export const RATING = {
  WORST: { value: 1, label: '😔' },
  BAD: { value: 2, label: '😕' },
  NORMAL: { value: 3, label: '😐' },
  GOOD: { value: 4, label: '🤩' },
  BEST: { value: 5, label: '🤯' }
}

export const IMAGE_MAX_SIZE_IN_BYTES = 102_400

export const LOGIN_ENDPOINT = 'login'
