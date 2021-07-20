describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const testuser = {
          name: 'Testi Tero',
          username: 'ttero',
          password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', testuser) 
      cy.visit('http://localhost:3000')})


    it('front page opens with login form', function() {
        cy.contains('Blogs')
        cy.contains('Log in to application')
    })

    describe('Login',function() {

        it('succeeds with correct credentials', function() {
            cy.get('#username').type('ttero')
            cy.get('#password').type('salainen')
            cy.get('#loginbutton').click()
            cy.contains('Logged in as Testi Tero')
        })
        
        it('fails with wrong credentials', function() {
            cy.get('#username').type('ttero')
            cy.get('#password').type('hahaha')
            cy.get('#loginbutton').click()

            cy.get('.error')
            .should('contain', 'Wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        })
    })

    describe('When logged in', function() {
    
        it('A new blog can be created', function() {
            cy.login({ username: 'ttero', password: 'salainen' })
            cy.get('#togglableShow').click()
            cy.get('#title').type('A new blog for testing')
            cy.get('#author').type('Nameless Person')
            cy.get('#url').type('www.testdotcom.com')
            cy.contains('create').click()
            cy.contains('A new blog for testing, written by Nameless Person')
        })

        it('Can like a blogpost', function() {
            cy.login({ username: 'ttero', password: 'salainen' })
            cy.get('#togglableShow').click()
            cy.get('#title').type('A new blog for testing')
            cy.get('#author').type('Nameless Person')
            cy.get('#url').type('www.testdotcom.com')
            cy.contains('create').click()
            cy.contains('A new blog for testing, written by Nameless Person')
            cy.get('#viewbutton').click()
            cy.get('#likebutton').click()
            cy.get('#likesDiv').contains('Likes: 1')
        })

        it('Can remove own blogpost', function() {
            cy.login({ username: 'ttero', password: 'salainen' })
            cy.get('#togglableShow').click()
            cy.get('#title').type('A new blog for testing')
            cy.get('#author').type('Nameless Person')
            cy.get('#url').type('www.testdotcom.com')
            cy.contains('create').click()
            cy.get('#viewbutton').click()
            cy.get('#removebutton').click()
            cy.wait(5002)
            cy.contains('A new blog for testing').should('not.exist')
        })

        it('Blogs are sorted with amount of likes', function() {
            cy.login({ username: 'ttero', password: 'salainen' })
            cy.addnewBlog({
                title: 'test blog',
                author: 'not original',
                url: 'testdot.fi',
                likes: 10
            })
            cy.addnewBlog({
                title: 'test blog2',
                author: 'not original2',
                url: 'testdot.com',
                likes: 9
            })
            cy.addnewBlog({
                title: 'test blog3',
                author: 'not original3',
                url: 'mostlikes.com',
                likes: 30
            })
            cy.get(".blog-container>.blog-title-author").should((blogs) => {
                expect(blogs[0]).to.contain("test blog3, written by not original3")
                expect(blogs[2]).to.contain("test blog2, written by not original2")
            })
        })
    })
})