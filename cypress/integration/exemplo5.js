context('Local Storage', () => {
    before(()=> {
        cy.visit('https://example.cypress.io/commands/local-storage')
        window.sessionStorage.setItem('red', 'red')
        window.sessionStorage.setItem('blue', 'blue')
        window.sessionStorage.setItem('magenta', 'magenta')
    }) 

    it('cy.localStorage', () => {
        cy.get('.ls-btn').click().should(()=>{
            expect(localStorage.getItem('prop1')).to.eq('red')
            expect(localStorage.getItem('prop2')).to.eq('blue')
            expect(localStorage.getItem('prop3')).to.eq('magenta')  
        })

        expect(sessionStorage.getItem('red')).to.eq('red')
        expect(sessionStorage.getItem('blue')).to.eq('blue')
        expect(sessionStorage.getItem('magenta')).to.eq('magenta')  
        cy.pause()

        /*cy.pause()
        cy.clearLocalStorage().should(() => {
            expect(localStorage.getItem('red')).to.be.null
            expect(localStorage.getItem('blue')).to.be.null
            expect(localStorage.getItem('magenta')).to.be.null
        })*/

        /*cy.pause()
        cy.clearLocalStorage('red').should(() => {
            expect(localStorage.getItem('red')).to.be.null
            expect(localStorage.getItem('blue')).to.eq('blue')
            expect(localStorage.getItem('magenta')).to.eq('magenta')  
        })*/
    })

    it('cy.localStorage - Apagar Tudo', () => {
        cy.pause()
        cy.clearLocalStorage().should(() => {
            expect(localStorage.getItem('red')).to.be.null
            expect(localStorage.getItem('blue')).to.be.null
            expect(localStorage.getItem('magenta')).to.be.null
        })
    })
})
