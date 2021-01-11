import login from './formLogin'

Cypress.Commands.add('validLogin', (user, pass)=>{
    cy.get(login.USERNAME).type(user)
    cy.get(login.PASS).type(pass)
    cy.get(login.BT_SUBMIT).click()
})