
const app_form_id = '85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
const email = Cypress.env('email')
const password = Cypress.env('password')

describe('Description of overall tests', function(){
    before(() => {
        cy.clearLocalStorage()
        cy.login(email, password, app_form_id)
      })
    it('a single test',() => {
        cy.vst_ai_meta('D19', 'BONA', '2020-08-29', 'BONA, BONA_001, September 30, 2020, distributed',
        'Baldwin, Harper, baldwinh@battelleecology.org',/*'Donoso, Evan, donoso@battelleecology.org',*/
         '2020-11-03', '2020 - NEON.DOC.000987vJ')     
        localStorage.clear();
        cy.parent_to_child('Apparent Individuals: Woody Stems (trees, shrubs, saplings, lianas)')
    })
    
    it('some other test',() =>{
        cy.add_child()
        //fill in child record?        
    })
    it('a third test',() =>{
        //fill in another child record?        
    })
})