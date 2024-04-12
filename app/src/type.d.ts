export interface User {
  id?: number
  name: string
  email: string
  password: string
  photo: string
  books: Book[]
  error?: string
}

export interface UserCredentials {
  email: User.Email
  password: User.Password
}

export type UserId = User.id
export type UserPhoto = User.photo
export type UserName = User.name

export interface UserSession {
  token: string
  name: User.name
  email: User.email
  id: User.id
  error?: string
}

export interface Book {
  id?: number
  title: string
  author: string
  rating: number
  userComment: string
  error?: string
  cover?: string
}

export type BookId = Book.id

export interface Notification {
  message: string
  type: string
}
