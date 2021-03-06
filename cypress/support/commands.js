/*
@title Fulcrum_Commands
	
@author: Walter Leo \email{leo@battelleecology.org}\cr

@description: Fulcrum specific Cypress functions

@keywords Cypress, App, Testing
	

@To-do Create required? function that tests requiredness, create classification list function 


*/

var jquery = require('jquery');
var mocha = require('mocha')
const { WSAETIMEDOUT } = require('constants');
const { get } = require('jquery');

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//This should be in the before command section of your tests
Cypress.Commands.add("login", (email, password, app_form_id) =>{ 
    cy.server()    
    cy.visit('https://web.fulcrumapp.com/dash/' + app_form_id) //formid
    //cy.wait('@getForm')
    cy.on('uncaught:exception', (err, runnable) => {
        expect(err.message).to.include('ajax')        
        done()
        //return false
      })
    cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        expect(err.message).to.include('evaluateDataEvent')
        // failing the test
        return false
    })     
    cy.get("body").then($body => {
        if ($body.find("#user_email").length > 0) {  //if redirected to login
               
            cy.get("#user_email").type(email) //Email
            cy.get("#user_password").type(password) //password
            cy.get('#user_remember_me').click()
            cy.get(".login-action").click()//login and wait 
            Cypress.Cookies.defaults({
                preserve: ['_fulcrum_session', 'remember_user_token','intercom-session-nxff46cx', 'membership']
              })
            //cy.visit('https://web.fulcrumapp.com/dash/' + app_form_id) //formid
        }
        
    }); 
    
})

//These commands are designated for when you are on the records screen
Cypress.Commands.add("new_record", (wait = 0) => {
    cy.get('.css-fx7t7r > .css-6hfj5t').click() // New Record
    .wait(wait*1000)
    
    cy.get('.css-1fzkik5 > .css-15kfp1r').click()//minimizes map
    .wait(wait*1000)
})

Cypress.Commands.add("edit_record",(record, wait = 0) =>{
    //clicks menu to show record_id column
    cy.get('.editor-column-setup')
    .click()
    cy.get('.editor-column-list-_record_id > .css-1r07785 > .css-1s26z8e > input')
    .click()
    cy.get('.editor-column-setup')
    .click()
    .wait(4000)
    //clicks column and searchs for record_id
    //cy.get().contains('Record ID')
    cy.get('.css-moppwm.css-s68feg.css-cnk7sl.editor-column-header.css-4g6ai3')
    .siblings()
    .eq(2)
    .click()
    cy.get('.css-1ytjkkg > .css-yorfbb > .css-79elbk > .css-12pj8i9')
    .type(record)
    .wait(3000)
    /*cy.get('.css-moppwm.css-s68feg.css-cnk7sl.editor-column-header.css-4g6ai3')
    .first()
    .click()*/
    //clicks button on left of record, selects edit, minimizes map in record
    cy.get('.css-1l4jnc3 > .css-128pz4s')
    .click()
    cy.get('.css-fm2z3y > div > :nth-child(1)')
    .click()
    cy.get('.css-1fzkik5 > .css-15kfp1r')
    .click()//minimizes map
    .wait(wait*1000)//minimizes map
})

//To exit a parent record you must be on the parent level of the app
Cypress.Commands.add('save_parent', (wait = 0)=>{
    cy.get('[class="react-modal"]').first()   
    .find('[title="Save"]')
    .click(wait*1000)
})

Cypress.Commands.add('close_parent',(wait = 0)=>{
    cy.get('[class="react-modal"]').first()   
    .find('[title="Close"]')
    .click()
    .wait(wait*1000)
})

//when you are in the parent listing and want to initiate child generation
Cypress.Commands.add('new_child',(label, wait = 0)=>{      
    cy.contains(label)
    .click()
    
    cy.get('.css-1jsohtw > .css-14x6aky')
    .first()
    .click()
    .wait(wait*1000)
/*
    cy.get('.css-1fzkik5 > .css-15kfp1r')
    .last()
    .click()//minimizes map
    .wait(wait*1000)
    */
})

Cypress.Commands.add('edit_new_child',(label, child_title, wait = 0)=>{      
    cy.contains(label)
    .click()
    
    cy.contains(child_title)
    .first()
    .click()
    .wait(wait*1000)

    cy.get('[class="react-modal"]').last()   
    .find('[title="Edit"]')
    .click(wait*1000)
/*//minimizes map
    cy.get('.css-1fzkik5 > .css-15kfp1r')
    .last()
    .click()
    .wait(wait*1000)
    */
})

Cypress.Commands.add('parent_to_child',(label, wait = 0)=>{      
    cy.contains(label)
    .click()
})

//When you are within the child menu listing
Cypress.Commands.add('add_child',(wait = 0)=>{
    cy.get('.css-1jsohtw > .css-14x6aky')
    .first()
    .click()
    .wait(wait*1000)
    cy.get("body").then($body => {
        if ($body.find('[style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"] > div > img').length > 0) {
            cy.get('.css-1fzkik5 > .css-15kfp1r')
            .last()
            .click()
            .wait(wait*1000)  
        }
    })     
})

Cypress.Commands.add('edit_child',(wait = 0)=>{
    cy.get('[class="react-modal"]').last()   
    .find('[title="Edit"]')
    .click(wait*1000)
})

Cypress.Commands.add('save_child',(wait = 0)=>{
    cy.get('[title="Save"]').last()   
    //.find('[title="Save"]')
    .click()
    .wait(wait*1000)
})

Cypress.Commands.add('close_child',(wait = 0)=>{
    cy.get('.editor-container').last()   
    .find('[title="Close"]').first()
    .click(wait*1000)
})

Cypress.Commands.add('child_to_parent',(wait = 0)=>{
    cy.get('.css-17dc5wb > .css-1p0myys').first()
    //cy.get('[data-layer="Padding"]').first()
    .click(wait*1000)
})




//For general fields of all sorts
Cypress.Commands.add("choicefield", (dataname, selection, wait = 0) =>{
    //selects value in choice field
    //can be also used for classification fields but you must know the exact value ie.["DBL_yes","<3"] 
    //label == field name
    //selection == what to type in 
    cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')            
    .children() 
    //.siblings('.css-lfvyaf')/*.css-1rosotf*/
    .find('.css-lea2i5')
    .select(selection)
})

Cypress.Commands.add("yesno",(dataname, selection, wait = 0)=>{
    cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
    .children()
    .find('.css-pb69ky')
    .contains(selection)
    .click()
    .wait(wait*1000)
})

Cypress.Commands.add('date',(dataname, date, wait = 0)=>{
    //fills in date field
    //label == field name
    //date == what to type in 
    //date must be entered yyyy-mm-dd format
    cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
    .children()
    .find('[type="date"]')
    .clear()
    .type(date)
    .wait(wait*1000)
})

Cypress.Commands.add('time',(dataname, time)=>{
    //fills in time field
    //label == field name
    //time == what to type in, must be in //HH:mm, HH:mm:ss or HH:mm:ss.SSS, where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999
    cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
    .children()
    .find('.css-rxtobg')
    .clear()
    .type(time)
})

Cypress.Commands.add('text',(dataname, entry, wait = 0)=>{
    //fills in text field
    //label == field name
    //entry == what to type in 
    cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
    .children()
    .find('.css-1um1x15')
    .clear()
    .type(entry)
    .wait(wait*1000)
})

Cypress.Commands.add('recordlink', (dataname, record_title, select = 'select', method = 'type', index, wait = 0)=>{
    //select == select | new; (select a current record or create new)
    //method == click | type | index;  (how to select record.  Records not on the starting modal need to be typed in.  Can also select via index position)
    //index == any #; Used with index method

    //**Be weary stringing these commands together simotainiously**
    if(select == 'New'){
        cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
    .children()
        .contains(select)
        .click()
        .wait(wait*1000)
    }else if (select == 'select'){
        if (method == 'type'){
            cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
            .children()
            .contains('Select')
            .click()
            cy.get('.css-1d8ocjm > :nth-child(2) > .css-sv4uu')
            .type(record_title)
            cy.get('[style="height: 260px; overflow: hidden scroll;"]')
            .children()
            .contains(record_title)
            .click()
            .wait(wait*1000)
        }else if(method == 'click'){
            cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
            .children()
            .contains('Select')
            .click().wait(1000)
            cy.contains(record_title)
            .click()
            .wait(wait*1000)
    }else if(method == 'index'){
        var index = parseInt(index) + 1
            cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
            .children()
            .contains('Select')
            .click().wait(1000)
        cy.get('[style="height: 260px; overflow: hidden scroll;"] > :nth-child(1) > :nth-child('+ index +')').click()
    }}
})

Cypress.Commands.add('hyperlink',(dataname)=>{
cy.get('.element-data-name-'+dataname)
.children('.css-1mtbxkt')
.children()
.find('.css-1sugwtq')
.children()
.click()
})


//These are for testing assumptions of fields
Cypress.Commands.add('popup',(response)=>{
    //manipulates popups
    //response == the button in the popup that you want to select
    cy.get('.modal-content')
    .children()
    //.find('.css-1ifqz3c')
    .last()
    .contains(response).wait(500)
    .click()
})

Cypress.Commands.add('hidden',(dataname)=>{
    //tests if field is hidden
    cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
    .children()
    .should('be.hidden', 'true')
})

Cypress.Commands.add('readonly',(dataname, tf = 'true')=>{
    //tests if field is read only
    if(tf == 'true'){
        cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
        .children()
        .find('.css-1um1x15')
        .should('be.disabled')
    }else if (tf == 'false'){
        cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
        .children()
        .find('.css-1um1x15')
        .should('not.be.disabled')
    }
})

Cypress.Commands.add('required',(dataname, tf = 'true')=>{ 
    //Looks for red astrisk. Does not work on dataevent SETREQUIRED set required
    if(tf == 'true'){
        cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
        .children()
        .contains('*')
        .should('be.visible') 
    }else if(tf == 'false'){
        cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
        .children()
        .contains('*')
        .should('not.be.visible') 
    }       //visibility: hidden !important;
})

Cypress.Commands.add('invalid', (fields)=>{
    //tests what fields will not let you save
    //fields == array of labels that you anticipate should prevent saving
    if(fields){
        fields
        var genArr =  Array.from(Array(fields.length).keys())
        cy.get('[title="Save"]').last()   
        .click()


        cy.wrap(genArr).each((index) => {
            
            cy.get('.modal-content.css-k4i5eu.modal-transition.entered')
            .find('.css-trwi6t')
            .children()
            .contains(fields[index])}
        )
        cy.get('.modal-content')
        .children()
        .last()
        .contains('Okay')
        .click()
    }
})

Cypress.Commands.add('equal',(fieldtype, dataname, entry, wait = 0)=>{
    //checks if a field is equal to somthing
    if(fieldtype == 'text'){
        cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
        .children()
        .find('.css-1um1x15')
        .should('eq', entry)
        .wait(wait*1000)
    }else if(fieldtype == 'choicefield'){
        cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
        .children()
        .find('.css-lea2i5')
        .should('have.value', entry)
    }else if(fieldtype == 'yesno'){
        cy.get('.element-data-name-'+dataname+'.css-1jh7eqz.css-1cynuie')
        .children()
        .find('.css-pb69ky')
        .should('eq', entry)    

        
    }
})

//VST AI SPECIFIC FUNCTIONS//
Cypress.Commands.add('vst_ai_meta',(domain, site, filterdate, plot, measuredBy, /*recordedBy,*/  date, protocol)=>{
    cy.new_record()
    localStorage.clear();        
    localStorage.removeItem('https://fulcrumapp.s3.amazonaws.com');
    //cy.recordlink('recordedby_link', '', 'select','index', 2)   
    cy.choicefield('domainid_filter', domain)
    cy.choicefield('siteid_filter', site)
    cy.date('filter_plotmetadata', filterdate)
    cy.recordlink('measuredby_link', measuredBy, 'select','click')
    cy.recordlink('plotid_link',plot, 'select', 'click')      
    cy.date('date', date)
    cy.choicefield('samplingprotocolversion', protocol)   
        
})

Cypress.Commands.add('vst_woody_ind',(tagid, growthform,)=>{
    cy.recordlink('tagID_select', tagid, 'Select', 'click')
    cy.choicefield('growthForm', growthform)
    cy.choicefield('plantStatus', plantstatus)
    cy.hidden('maxcrowndiameter')
    cy.hidden('ninetycrowndiameter')
    cy.save_child()
    cy.invalid(['stemdiameter', 'measurementheight', 'vdapexheight', 'vdbaseheight'])
    cy.text('stemDiameter (0.1 cm)',30)        
    cy.text('measurementHeight (1 cm)',80)
    cy.text('vdApexHeight (0.1 m)',10)
    cy.text('vdBaseHeight (0.1 m)',-1)  
    cy.choicefield('canopyPosition', 'Open grown')
    cy.save_child(1)
})
//cy.recordlink('recordedBy', recordedBy,'select','index', 2)

    //cy.wait(wait)    