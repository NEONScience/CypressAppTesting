
const app_form_id = 'your_apps_form_id'
const email = Cypress.env('email')
const password = Cypress.env('password')

describe('Description of overall tests', function(){
    before(() => {
        cy.clearLocalStorage()
        cy.login(email, password, app_form_id)
      })
    it('a single test',() => {
        //fill out meta data?
    })
    it('some other test',() =>{
        //fill in child record?        
    })
    it('a third test',() =>{
        //fill in another child record?        
    })
})