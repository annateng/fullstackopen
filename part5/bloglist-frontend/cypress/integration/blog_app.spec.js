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

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'monkey-man', password: 'm0nk3ys33' })
      cy.addBlog({ title: 'Auto Blog 1', author: 'M. Night', url: 'myspace.org' })
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
      cy.get('@firstBlog').contains('show').click()
      cy.get('@firstBlog').contains('like').click()

      cy.get('@firstBlog').should('contain', 'likes: 1')
    })

    it('user can delete blog he created', function() {
      cy.contains('Auto Blog 1').parent().as('firstBlog')
      cy.get('@firstBlog').contains('show').click()
      cy.get('@firstBlog').contains('delete').click()

      cy.get('html').should('not.have.descendants', 'blog')
    })

    it('user cannot delete blog he didn"t create', function() {
      cy.login({ username: 'boris', password: 'password123' })

      cy.contains('Auto Blog 1').parent().as('firstBlog')
      cy.get('@firstBlog').contains('show').click()
      cy.get('@firstBlog').contains('delete').click()

      cy.contains('error deleting blog')
      cy.get('html').should('have.descendants', '.blog')
    })

    it('blogs are listed in descending order by likes', function() {
      cy.addBlog({ title: 'Auto Blog 2', author: 'M. Night', url: 'myspace.org', likes: 22 })
      cy.addBlog({ title: 'Auto Blog 3', author: 'M. Night', url: 'myspace.org', likes: 10 })

      cy.get('button:contains("show")').click({ multiple: true })

      cy.get('.likes').then(likes => {
        let likes1 = parseInt(likes.eq(0).text().substring(7, 9))
        let likes2 = parseInt(likes.eq(1).text().substring(7, 9))
        let likes3 = parseInt(likes.eq(2).text().substring(7, 9))

        expect(likes1).to.be.gte(likes2)
        expect(likes2).to.be.gte(likes3)
      })
    })
  })
})
