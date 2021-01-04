import LoginElements from '../elements/LoginElements'
const loginElements = new LoginElements
const url = Cypress.config("baseUrl")

class LoginPage {
    acessarSite() {
        cy.visit(url)
    }
    clicarBotaoPaginaLogin() {
        cy.get(loginElements.botaoLogin())
        .contains('Password')
        .click()
    }
    visualizarTelaRecuperarSenha() {
        cy.pause()
        cy.get(loginElements.botaoRecuperarSenha())
        .should('contain', 'Password')
    }
}
export default LoginPage;

