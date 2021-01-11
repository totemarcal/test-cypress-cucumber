
context('Pesquisa Tabela de Funcionário', ()=> {
  before(()=> {
    cy.visit('https://opensource-demo.orangehrmlive.com')
  })

  it('Busca em tabela', ()=>{
    let count
    cy.validLogin('Admin', 'admin123')

    cy.get('#menu_pim_viewPimModule > b')
    .click()

    cy.get('#resultTable')
    .find('tbody>tr')
    .as('table')
/*
    cy.get('@table')
    .each(function($el, index, $list){
      //console.log($el.text(), index)
      cy.get('@table')
      .eq(index)
      .find('td')
      .each(($el, index, $list) => {
        if (index == 2){
          console.log($el.text())
        }
      })
    })*/

    cy.get('@table')
    .should('contain', 'Luke')

    cy.pause()

    cy.get('@table')
    //.first()
    .eq(5)
    .find('td')
    .first()
    .find("input[type=checkbox]")
    .as('checkbox')

    cy.get('@checkbox')
    .click({ force:true})

    cy.get('#btnDelete')
    .click()

    cy.get('#dialogDeleteBtn')
    .click()

    cy.get('.message')
    .should('contain', 'Deleted')

  })

})