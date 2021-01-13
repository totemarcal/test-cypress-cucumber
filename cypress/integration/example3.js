context('Teste de API', () => {
      it('cy.request() - Teste usando XHR', () => {
        cy.request('http://localhost:3000/produtos')
        .should((response) => {
            //console.log(response)
            expect(response.status).to.eq(200)
            expect(response).to.have.property('headers')
        })
      })

      it('cy.request() - Teste usando BDD', () => {
        cy.request('http://localhost:3000/produtos')
        .then((response) => {
            console.log(response)
            expect(response).property('status').to.equal(200)
            expect(response).to.include.keys('headers', 'duration'  )
        })
      })

      it('cy.request - Teste usando parametros', () => {
        cy.request({
          url: 'http://localhost:3000/produtos',
          qs: {
            id: 3
          }
        })
        .its('body')
        .should('be.an', 'array')
        .and('have.length', 1)
        .its(0)
        .should('contain', {"nome": "X-Bacon", "preco": 12.5})
      })

      it.only('cy.request - Teste encadeando request', () => {
        cy.request('http://localhost:3000/produtos?_limit=1')
        .its('body')
        .its(0)
        .then((response) => {
          expect(response).property('id').to.be.a('number')
          cy.request('PUT', `http://localhost:3000/produtos/${response.id}`, {
            "nome": "Hamburger Vegano",
            "descricao": "Pão, bife vegano 90g, 1 fatia de queijo de castanha, 2 fatia de bacon, salada e batata.",
            "preco": 12.5,
            "categoria_id": response.categoria_id
          })
          .then((response) => {
            expect(response).property('status').to.equal(200)
          })
          cy.request('POST', `http://localhost:3000/produtos/`, {
            "nome": "Hamburger Vegano",
            "descricao": "Pão, bife vegano 90g, 1 fatia de queijo de castanha, 2 fatia de bacon, salada e batata.",
            "preco": 12.5,
            "categoria_id": response.categoria_id
          })
          .then((response) => {
            expect(response).property('status').to.equal(201)
          })
          cy.request('PATCH', `http://localhost:3000/produtos/${response.id}`, {
            "preco": 8.5
          })
          .then((response) => {
            expect(response).property('status').to.equal(200)
          })
          cy.request('DELETE', `http://localhost:3000/produtos/${response.id}`)
          .then((response) => {
            expect(response).property('status').to.equal(200)
          })
        })
      })
})