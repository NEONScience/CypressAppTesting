
const app_form_id = '85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
const email = Cypress.env('email')
const password = Cypress.env('password')

describe('Description of overall tests', function(){
    before(() => {
        cy.clearLocalStorage()
        cy.login(email, password, app_form_id)
        cy.new_record()
      })
    it('metadata',() => {
        cy.newchoicefield('siteid_filter', 'PUUM')      
    })
})
