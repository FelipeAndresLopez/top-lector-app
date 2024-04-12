/// <reference types="cypress" />

describe('top lector app test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Felipe Andres Lopez',
      email: 'felipeandreslopez91@gmail.com',
      password: '12345678',
      photo: 'https://i.pravatar.cc/300'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
  })
  it('frontpage can be opened', () => {
    cy.contains('Top Lector')
  })

  it('user can login', () => {
    cy.contains('Iniciar Sesión').click()
    cy.get('[name="email"]').type('felipeandreslopez91@gmail.com')
    cy.get('[name="password"]').type('12345678')
    cy.get('button').contains('Iniciar Sesión').click()
    cy.contains('Mis Libros')
  })

  it('login fails with wrong credentials', () => {
    cy.contains('Iniciar Sesión').click()
    cy.get('[name="email"]').type('felipeandreslopez91@gmail')
    cy.get('[name="password"]').type('12345678')
    cy.get('button').contains('Iniciar Sesión').click()
    cy.get('.error')
      .should('contain', 'invalid username or password')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ email: 'felipeandreslopez91@gmail.com', password: '12345678' })
    })
    it('a new book can be added', () => {
      cy.get('a').contains('+').click()
      cy.get('[name="title"]').type('Cien años de soledad')
      cy.get('[name="author"]').type('Gabriel García Márquez')
      cy.get('[name="userComment"]').type('Me encanta este libro')

      cy.get('button').contains('Registrar').click()
    })

    it('a book can be added', () => {
      cy.createBook({
        title: 'La Iliada y la Odisea',
        author: 'Homero',
        userComment: 'Genial',
        rating: 5
      })
    })
  })
})