
context('Login', () => {
    let data=''
    let personal = ''
    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
      data = require('../fixtures/login')    

      cy.fixture('formperfil').then(function (p) {
        personal = p;
      })    
    })
    
    it('.type() - Tela de Login Sucess', () => {
      const dataFilter = data.filter((value) => {
        if ('error' in value && value.error === false) {
             return value;
        } 
      } )
      dataFilter.map((dt) => {
        assert.isObject(dt, 'value is object')

        cy.get('input[name=txtUsername]')
        .clear()
        .type(dt.login , { delay: 100 })
        .should('have.value', 'Admin')

        cy.get('input[name=txtPassword]')
        .clear()
        .type(dt.senha , { delay: 100 })
        
        cy.get('input[type=submit]')
        .click()

        cy.get('.head')
        .should('contain','Dashboard')
        
      })

      cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/viewMyDetails')

      cy.get('input[id=btnSave]')
      .click()

      Object.keys(personal).forEach(function(item){
        console.log(item)
        cy.get('input[id='+item+']')
        .clear()
        .type(personal[item])
        //console.log(item + " = " + personal[item]);
       });
       
       /*for (var property in personal){
         console.log(property + " = " + personal[property]);
       }*/

       cy.get('.radio [id=personal_optGender_2]').not('[disabled]')
       .check().should('be.checked')
       //.uncheck().should('not.be.checked')

       cy.get('[id=personal_cmbMarital]').select('Single')

       cy.get('input[id=btnSave]')
      .click()
    })

    it('.type() - Tela de Login Invalid', () => {
      const dataFilter = data.filter((value) => {
        if ('error' in value && value.error === true) {
             return value;
        } 
      } )

      dataFilter.map((dt) => {
        cy.get('input[name=txtUsername]')
        .clear()
        .type(dt.login , { delay: 100 })

        cy.get('input[name=txtPassword]')
        .clear()
        .type(dt.senha , { delay: 100 })
        
        cy.get('input[type=submit]')
        .click()
    
        cy.get('span[id=spanMessage]')
        .should('contain','Invalid credentials')
    
      })
    })
})