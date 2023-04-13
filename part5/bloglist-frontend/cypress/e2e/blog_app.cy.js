describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })
  it('loads login as default', function() {
    cy.contains('username')
    cy.contains('password')
  })
})