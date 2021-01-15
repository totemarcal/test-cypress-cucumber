
context('End, Promises e Location', () => {
    before(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com')
    })

    it('.end() - end the command chain', () => {
        cy.validLogin('Admin', 'admin123')

        cy.get('#menu_pim_viewPimModule > b')
        .click()

        cy.get('#frmList_ohrmListComponent').within(() => {
            cy.contains('Chief Technical Officer').click().end()
            cy.root().should('have.id', 'frmList_ohrmListComponent')
            cy.contains('Odis').click().end()   
            cy.go('back')
            cy.go('forward')
            cy.go(-1)
            cy.go(1)
        })
    })

    it('Cypress.Promise - instantiate a bluebird promise', () => {
        let waited = false
        function waitOneSecond () {
          // return a promise that resolves after 1 second
          // @ts-ignore TS2351 (new Cypress.Promise)
          return new Cypress.Promise((resolve, reject) => {
            setTimeout(() => {
              // set waited to true
              waited = true
              // resolve with 'foo' string
              resolve('foo')
            }, 1000)
          })
        }
    
        cy.then(() => {
          // return a promise to cy.then() that
          // is awaited until it resolves
          return waitOneSecond().then((str) => {
            expect(str).to.eq('foo')
            expect(waited).to.be.true
          })
        })
      })

      it('cy.location() - get window.location', () => {
        // https://on.cypress.io/location
        cy.location().should((location) => {
          expect(location.hash).to.be.empty
          expect(location.href).to.eq('https://opensource-demo.orangehrmlive.com/index.php/pim/viewEmployee/empNumber/2')
          expect(location.host).to.eq('opensource-demo.orangehrmlive.com')
          expect(location.hostname).to.eq('opensource-demo.orangehrmlive.com')
          expect(location.origin).to.eq('https://opensource-demo.orangehrmlive.com')
          expect(location.pathname).to.eq('/index.php/pim/viewEmployee/empNumber/2')
          expect(location.port).to.eq('')
          expect(location.protocol).to.eq('https:')
          expect(location.search).to.be.empty
        })
      })

})