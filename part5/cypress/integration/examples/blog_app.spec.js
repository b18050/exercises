describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // const user = {
    //     "username": "abchanda",
    //     "name": "CarryisLo",
    //     "password": "abchann"
    // }
    // cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('CarryMinati')
    cy.get('#password').type('tiktok')
    cy.get('#login-button').click()
    cy.contains('CarryisLove logged in')
  })  

  describe('when logged in', function() {
    beforeEach( function() {
      cy.contains('login').click()
      cy.get('#username').type('CarryMinati')
      cy.get('#password').type('tiktok')
      cy.get('#login-button').click()
    })

    it('A New Blog can be added', function() {
        cy.contains('new blog').click()
        cy.contains('Create a new blog')
        cy.get('#newtitle').type('I am a testing blog')
        cy.get('#newauthor').type('CarryMinati')
        cy.get('#newurl').type('WWW.carryislive.com')
        cy.contains('save').click()
        cy.contains('I am a testing blog')
    })

  })

})