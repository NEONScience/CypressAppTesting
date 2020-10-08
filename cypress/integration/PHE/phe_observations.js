/*
@title phe_observations.js
	
@author: Walter Leo \email{leo@battelleecology.org}\cr

@description: phenology observations testing

@keywords Cypress, App, Testing
	

@To-do Add more tests


*/

const app_form_id = 'ee2b3ddb-b592-4098-b0b8-5f191595302f'//DEV //'4106161a-88ec-40d3-aa0f-d5e1e7c9e641'//,prod PHE field setup app
const email = 'youremail@battelleecology.org'
const password = 'xxxxxxxxxxxx'

describe('Login to fulcrum, Select App, & Create new record', function(){       
    before(() => {
        cy.login(email, password, app_form_id, 10)
        Cypress.Cookies.defaults({
            preserve: ['_fulcrum_session', 'remember_user_token','intercom-session-nxff46cx', 'membership']
          })
      })
    beforeEach(() => {        
        //Cypress.Cookies.preserveOnce('_fulcrum_session', 'remember_user_token', 'membership')
    })
    it('opening and closing child record',() => {
        //cy.login(email, password, app_form_id, 10)
        cy.edit_record('a23e2bc4-b5db-410d-abd9-9f738ea2f9cf',1)//'12105281-10fc-4e6f-9f2c-15af264c0c4c' prod record
        cy.edit_new_child('Enter per individual information','269|Right|5,06238,RHDA, >NOTCHECKED<')
        cy.choicefield('Breaking leaf buds','["DBL_yes","<3"]')
        


        })


    })