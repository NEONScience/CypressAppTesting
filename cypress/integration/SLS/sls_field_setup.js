/*
@title sls_field_setup.js
	
@author: Walter Leo \email{leo@battelleecology.org}\cr

@description: sls field setup app testing

@keywords Cypress, App, Testing
	

@To-do Add more tests


*/

const app_form_id = '8e82b7a1-8d11-4bac-baad-de6b2c9d8681'//,'85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
const email = Cypress.env('email')
const password = Cypress.env('password')

describe('Login to fulcrum, Select App, & Create new record', function(){
    before(() => {
        cy.login(email, password, app_form_id, 10)
      })
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('_fulcrum_session', 'remember_user_token')
    })
    it('Sampling Impractical',() => {
        //cy.login(email, password, app_form_id, 10)
        cy.new_record(3)
        cy.choicefield('domainID personnel', 'D03')
        cy.choicefield('Select a Site','DSNY',3)
        cy.choicefield('nTransBoutType', 'No')
        cy.recordlink('Select plotID','DSNY_001','Select', 'click')
        cy.choicefield('boutType','microbes')
        cy.choicefield('sampleTiming','peakGreenness',1)
        cy.popup('Yes')
        //meta data
        cy.new_child('SOP B: per sample','T', 3)
        cy.choicefield('samplingImpractical', 'logistical', 6)
        cy.choicefield('subplotID', '21')
        cy.hidden('Toxicodendron Possible?')
        cy.time('collectTime', '15:32')
        cy.date('collectDate','2020-09-15')
        cy.text('remarks', 'COVID')
        cy.save_child()
        //cy.required('remarks')
        
    })
})


