context('Screenshot da Tabela de Funcionário', () => {
    before(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com')
    })

    it('cy.screenshot', () => {
      cy.validLogin('Admin', 'admin123')

      cy.get('#menu_pim_viewPimModule > b')
      .click()
        
      Cypress.Screenshot.defaults({
        blackout: ['#search_form > fieldset'],
        capture: 'runner',
        //clip: { x: 0, y: 0, width: 100, height: 100 }
        disableTimersAndAnimations: true,
        onBeforeScreenshot () {

        },
        onAfterScreenshot () {
          
        }
      })
      
      cy.screenshot('listagem-funcionario')

      cy.get('#empsearch_supervisor_name')
      .type('Luiz',  { delay: 100 })

      cy.pause()
      

      cy.reload()
    })
})