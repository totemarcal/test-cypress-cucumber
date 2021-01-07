context('Login', () => {
    let data = []
    let perfis = []
    before(()=> {
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/auth/validateCredentials')
        cy.fixture('login').then( (dt) => {
            data = dt
        })

        cy.fixture('formperfil').then( (dt) => {
            perfis = dt
        })
    })

    it('.type () - Tela de Lgin', () => {
        data.map((dt)=>{
            cy.get('#txtUsername')
            .clear()
            .type(dt.login, {delay: 100})

            cy.get('#txtPassword')
            .clear()
            .type(dt.senha, {delay: 100})

            cy.get('input[type=submit]')
            .click()

            if (dt.error){
                cy.get('#spanMessage')
                .should('contain', 'Invalid credentials')
            }

            if (!dt.error){
                cy.get('.head')
                .should('contain', 'Dashboard')
            }
         })

         cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/viewMyDetails')

         cy.get('#btnSave')
         .click()

         perfis.map((perfil) => { 
            Object.keys(perfil).forEach( (item) => {
                if(perfil[item]=="")
                {   cy.get('#'+item)
                    .clear()
                }else{
                    cy.get('#'+item)
                    .clear()
                    .type(perfil[item])
                }
            })

            cy.get('#personal_optGender_2').not('disabled')
            .check().should('be.checked')

            cy.get('#personal_cmbMarital').select('Married')

            cy.get('#btnSave')
            .click()

            /*
            console.log(perfil)
            console.log(perfil.error)
            cy.pause()

            if(perfil.error)
            {
                cy.get(':nth-child(1) > span.validation-error')
                .should('contain', 'Required')
            }
            else{
                cy.get('.message')
                .should('contain', 'Saved')
            }*/

        })
    })
         
})