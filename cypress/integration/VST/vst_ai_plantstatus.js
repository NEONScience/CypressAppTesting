/*
@title vst_ai.js
	
@author: Walter Leo \email{leo@battelleecology.org}\cr

@description: vst:ai app testing

@keywords Cypress, App, Testing
	

@To-do Add more tests


*/

const app_form_id = '85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
//import lodash from 'lodash'
//console.log({lodash})
//import login_credentials  from '../../support/login_credentials'
//console.log(login_credentials)
const email = Cypress.env('email')
const password = Cypress.env('password')
console.log(email, password)


describe('Login to fulcrum, Select App, & Create new record', function(){
    before(() => {
        cy.clearLocalStorage()
        cy.login(email, password, app_form_id, 14, 4)
      })
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('_fulcrum_session', 'remember_user_token')
    })
    it('Meta data',() => {
        cy.vst_ai_meta('D01', 'BART', '2020-05-01', 'BART, BART_001, June 11, 2020, distributed', '2020-10-14')
        cy.new_child('Apparent Individuals: Woody Stems (trees, shrubs, saplings, lianas)')
    })
    it('mbt status 9',() =>{
        cy.recordlink('tagID_select', 'BART_001, 00001, 31, ACRU, 2020', 'Select', 'click',6)
        cy.choicefield('growthForm', '(mbt) multi-bole tree')
        cy.choicefield('plantStatus', '9 - Live, broken bole', 3)
        cy.popup('All the boles are broken')
        cy.hidden('maxcrowndiameter')
        cy.hidden('ninetycrowndiameter')
        cy.save_child(1)
        cy.invalid(['stemdiameter', 'measurementheight', 'vdapexheight', 'vdbaseheight'])
        cy.text('stemDiameter (0.1 cm)',30)        
        cy.text('measurementHeight (1 cm)',80)
        cy.text('vdApexHeight (0.1 m)',10)
        cy.text('vdBaseHeight (0.1 m)',-1)  
        cy.choicefield('canopyPosition', 'Open grown')
        cy.save_child(1)
        
    })
})