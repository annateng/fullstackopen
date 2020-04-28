describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request({
      url: 'http://localhost:3001/api/users',
      method: 'POST',
      body: { 
        username: 'monkey-man',
        password: 'm0nk3ys33'
      }
    })
    cy.request({
      url: 'http://localhost:3001/api/users',
      method: 'POST',
      body: { 
        username: 'boris',
        password: 'password123'
      }
    })
    cy.visit('http://localhost:3000')
  })

  it('login form shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('monkey-man')
      cy.get('#password').type('m0nk3ys33')
      cy.contains('login').click()

      cy.contains('monkey-man is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('monkey-man')
      cy.get('#password').type('monkeysee')
      cy.contains('login').click()

      cy.get('.message')
        .should('contain','Wrong Credentials')
        .and('have.css', 'color', 'rgb(184, 134, 11)')
    })
  })

  describe.only('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'monkey-man', password: 'm0nk3ys33' })
      cy.addBlog({ title: 'Auto Blog 1', author: 'M. Night', url: 'myspace.org'})
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('My First Blog')
      cy.get('#author').type('M. Man')
      cy.get('#url').type('www.facebook.com')
      cy.contains('create').click()

      cy.contains('My First Blog')
      cy.get('.blog').should('have.length', 2)
    })

    it('user can like blog', function() {
      cy.login({ username: 'boris', password: 'password123' })

      cy.contains('Auto Blog 1').parent().as('firstBlog')
      cy.get('@firstBlog').contains('show').click();
      cy.get('@firstBlog').contains('like').click();

      cy.get('@firstBlog').should('contain', 'likes: 1')
    })

  })
})