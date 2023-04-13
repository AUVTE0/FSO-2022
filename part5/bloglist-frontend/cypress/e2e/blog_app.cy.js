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
      cy.addUser({
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
  describe('when logged in', function() {
    this.beforeEach(function() {
      cy.addUser({
        name: 'User 1',
        username: 'user1',
        password: 'password1'
      })
      cy.login({
        username: 'user1',
        password: 'password1'
      })
    })
    it('a blog can be created', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('Blog 1')
      cy.get('#author').type('User 1')
      cy.get('#url').type('www.url1.com')
      cy.get('#create-button').click()
      cy.get('html')
        .should('contain', 'Blog 1')
        .and('contain', 'User 1')
    })
    describe('and several blogs exist', function() {
      this.beforeEach(function() {
        cy.createBlog({
          title: 'Blog 1',
          author: 'User 1',
          url: 'www.url1.com',
          likes: 1
        })
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
          name: 'User 2',
          username: 'user2',
          password: 'password2'
        })
        cy.login({
          username: 'user2',
          password: 'password2'
        })
        cy.createBlog({
          title: 'Blog 2',
          author: 'User 2',
          url: 'www.url2.com',
          likes: 2
        })
        cy.createBlog({
          title: 'Blog 3',
          author: 'User 3',
          url: 'www.url3.com',
          likes: 3
        })
      })
      it('user can like a blog', function(){
        cy.contains('Blog 1').contains('view').click()
        cy.contains('Blog 1').contains('like').click()
        cy.contains('Blog 1').contains('likes 2')
        cy.contains('Blog 2').contains('view').click()
        cy.contains('Blog 2').contains('like').click().click()
        cy.contains('Blog 2').contains('likes 4')
      })

      it('user can delete own blog', function(){
        cy.contains('Blog 2').contains('view').click()
        cy.contains('Blog 2').contains('remove').click()
        cy.should('not.contain', 'Blog 2')
      })

      it('can only see delete button on own blog', function(){
        cy.contains('Blog 1').contains('view').click()
        cy.should('not.contain', 'remove')
      })
      it('blogs are ordered by most likes', function(){
        cy.get('#blog-0').should('contain', 'Blog 3')
        cy.get('#blog-2').should('contain', 'Blog 1')
      })
    })


  })
})