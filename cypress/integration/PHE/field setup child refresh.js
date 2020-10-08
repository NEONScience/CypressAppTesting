/*
@title phe_field_setup_open_close records.js
	
@author: Walter Leo \email{leo@battelleecology.org}\cr

@description: phenology recreating ingest records

@keywords Cypress, App, Testing
	

@To-do Add more tests


*/

const app_form_id = '55964b15-36af-44f4-b610-c3ffac2a0233'//DEV //'4106161a-88ec-40d3-aa0f-d5e1e7c9e641'//,prod PHE field setup app
const email = 'youremail@battelleecology.org'
const password = 'xxxxxxxxxxxx'

describe('Login to fulcrum, Select App, & Create new record', function(){       
    before(() => {
        // log in only once before any of the tests run.
        // your app will likely set some sort of session cookie.
        // you'll need to know the name of the cookie(s), which you can find
        // in your Resources -> Cookies panel in the Chrome Dev Tools.
        cy.login(email, password, app_form_id, 10)
      })
    beforeEach(() => {
        // before each test, we can automatically preserve the
        // 'session_id' and 'remember_token' cookies. this means they
        // will not be cleared before the NEXT test starts.
        //
        // the name of your cookies will likely be different
        // this is an example
        Cypress.Cookies.preserveOnce('_fulcrum_session', 'remember_user_token', 'membership')
    })
    it('opening and closing child record',() => {
        //cy.login(email, password, app_form_id, 10)
        cy.edit_record('efb5adf5-cb66-45a5-8539-bee5251aac3c',1)//'12105281-10fc-4e6f-9f2c-15af264c0c4c' prod record
        cy.get('.css-1f82zgw > .css-i9gxme')
        .click()     
       

        cy.get(".css-14yzgyq > .css-18crk8d").then(($span) => {
        // $span is the object that the previous command yielded
        const children = parseInt($span.text().replace(/\D/g,''));
        cy.log(children);
        //var genArr =  Array.from(Array(children).keys())
        var genArr = Array.from({length: children}, (_, i) => i + 1)
        console.log(genArr)
        cy.log(genArr);

        cy.wrap(genArr).each((index) => {
            cy.get(":nth-child(2) > .css-vgkx0d > .css-j8ndcu > :nth-child("+ index +")" )
            .click()
            cy.edit_child()
            cy.save_child(5)
        })      


        })


    })
         
         /*
        cy.get(':nth-child(2) > .css-vgkx0d > .css-j8ndcu > :nth-child(1)')
        .siblings()
        .last()
        
        var genArr =  Array.from(Array(cy.log(children)).keys())
    cy.get('[class="react-modal"]').last()   
    .find('[title="Save"]')
    .wait(1500)
    cy.get(':nth-child(2) > .css-vgkx0d > .css-j8ndcu')
        .children()
        .then(listing => {
            const listingCount = Cypress.$(listing).length;
            expect(listing).to.have.length(listingCount);
        });

    cy.wrap(genArr).each((index) => {
        cy.get('.modal-content.css-k4i5eu.modal-transition.entered')
        .find('.css-trwi6t')
        .children()
        .contains(fields[index])
    })      
    
    
    })*/




})

