/*
@title vst_ai.js
	
@author: Walter Leo \email{leo@battelleecology.org}\cr

@description: vst:ai app testing

@keywords Cypress, App, Testing
	

@To-do Add more tests


*/

const app_form_id = '85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
const email = 
const password = 

import * as myModule from 

describe('Login to fulcrum, Select App, & Create new record', function(){
    before(() => {
        cy.clearLocalStorage()
        cy.login(email, password, app_form_id, 10, 2)
        Cypress.Cookies.defaults({
            preserve: ['_fulcrum_session', 'remember_user_token','intercom-session-nxff46cx', 'membership']
          })
      })
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('_fulcrum_session', 'remember_user_token')
    })
    it('Meta data',() => {
        cy.new_record(3)
        cy.choicefield('domainid', 'D06')
        cy.choicefield('Select a siteID', 'KONZ')
        cy.date('FILTER: Show Plot Meta-Data collected after this date', '2018-01-25',2)
        cy.recordlink('plotID<record link>','KONZ, KONZ_042, September 15, 2020, tower', 'Select', 'click')
        cy.date('Date', '2020-09-01', 2)
        cy.required('measuredBy', 'true')
        cy.required('randomSubplotA (ref)', 'false')
        cy.readonly('randomSubplotA (ref)', 'true')
        cy.readonly('samplingProtocolVersion', 'false')

    })
    it('status 9 & 10',() => {
        cy.new_child('Apparent Individuals: Woody Stems (trees, shrubs, saplings, lianas)')
        cy.recordlink('tagID_select', 'KONZ_042, 00007,', 'Select', 'click',6)
        cy.choicefield('growthForm', '(sbt) single bole tree')
        cy.choicefield('plantStatus', '9 - Live, broken bole')
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
    it('multibole trees',() => {
        cy.add_child(4)
        cy.recordlink('tagID_select', '04088', 'Select', 'type', 6)
        cy.choicefield('growthForm', '(mbt) multi-bole tree')
        cy.choicefield('plantStatus', '1- Live',6)        
        cy.text('stemDiameter (0.1 cm)',30)
        cy.text('measurementHeight (1 cm)',80)
        cy.text('vdApexHeight (0.1 m)',10)
        cy.text('vdBaseHeight (0.1 m)',-1)  
        cy.text('maxCrownDiameter (0.1 m)',6)
        cy.text('ninetyCrownDiameter (0.1 m)',3)
        cy.choicefield('canopyPosition', 'Open grown')
        cy.yesno('addMultipleStems?', 'Yes')
        cy.save_child()
        cy.new_child('Apparent Individuals: Woody Stems (trees, shrubs, saplings, lianas)',4)
    })
})