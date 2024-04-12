/// <reference types="cypress" />
Cypress.Commands.add('login', ({ email, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    email,
    password
  }).then(({ body }) => {
    window.localStorage.setItem('loggedUserTopLectorApp', JSON.stringify(body))
    cy.visit('http://localhost:5173/')
  })
})

Cypress.Commands.add('createBook', ({ title, author, userComment, rating }) => {
  cy.request({
    url: 'http://localhost:3001/api/books',
    method: 'POST',
    body: {
      title,
      author,
      userComment,
      rating
    },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedUserTopLectorApp') || '').token}`
    }
  })
    .then(() => {
      cy.visit('http://localhost:5173/mi-perfil')
    })
})