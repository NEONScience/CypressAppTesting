/* @title
VST AI update v2.1.0 Cypress tests

@author
Walter Leo
email{leo@battelleecology.org}cr

@description
Cypress tests based on FS review
Non-woody plant status update


@keywords
cypress, app testing, javascript, fulcrum, vst, apparent individuals

@To-do
*/

const app_form_id = '85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
const email = Cypress.env('email')
const password = Cypress.env('password')
const vst_ai = Cypress.env('vst_ai')

describe('VST AI v2.1.0 app updates', function(){
    before('Logging in and visiting app',() => {
        
        cy.login(email, password, app_form_id)
        localStorage.clear();        
        localStorage.removeItem('https://fulcrumapp.s3.amazonaws.com');
      })
    beforeEach(()=>{
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            expect(err.message).to.include('evaluateDataEvent')
            // failing the test
            return false
        })    
    })
    it('metadata',() => {
        cy.vst_ai_meta('D19', 'BONA', '2020-08-29', 'BONA, BONA_001, September 30, 2020, distributed',
                        'Baldwin, Harper, baldwinh@battelleecology.org',/*'Donoso, Evan, donoso@battelleecology.org',*/
                         '2020-11-03', '2020 - NEON.DOC.000987vJ')     
        localStorage.clear();
        cy.parent_to_child('Apparent Individuals: Non-Woody Stems (cacti, ferns,  palms etc.)')
    })

    it('',() => {
    
    })

})