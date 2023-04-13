describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })
  it('loads login as default', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('login', function() {
    this.beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
        name: 'Johnny Depp',
        username: 'jdepp',
        password: 'abcde'
      })


    })
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('jdepp')
      cy.get('#password').type('abcde')
      cy.get('#login-button').click()
      cy.contains('Johnny Depp logged in')
      // cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
      //   username: 'jdepp',
      //   password: 'abcde'
      // })
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('jdepp')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('html')
        .should('contain', 'incorrect')
        .and('not.contain', 'logged in')
    })
  })
})