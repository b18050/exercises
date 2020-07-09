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

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('CarryMinati')
        cy.get('#password').type('tiktok')
        cy.get('#login-button').click()
        cy.contains('CarryisLove logged in')
    })

    it('fails with wrong credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('Carry')
        cy.get('#password').type('test')
        cy.get('#login-button').click()
        cy.contains('Wrong username or password')
    })
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
        cy.contains('I am a testing blog CarryMinati')
    })

    it('User can like a blog', function () {
        cy.contains('I am a testing blog CarryMinati')
          .contains('view').click()
          .get('#like-button').click()
    })

    it('User can delete a blog', function () {
        cy.contains('I am a testing blog CarryMinati')
          .contains('view').click()
          .get('#remove-button').click()
    } )

    it('All users cannot delete a blog', function () {
        cy.contains('Logout').click()
        cy.contains('login').click()
        cy.get('#username').type('CarryMinati')
        cy.get('#password').type('tiktok')
        cy.get('#login-button').click()
        cy.contains('CarryisLove logged in')
        cy.contains('Beauties and Beast JImmu seddril')
          .contains('view').click()
    })

  })

})