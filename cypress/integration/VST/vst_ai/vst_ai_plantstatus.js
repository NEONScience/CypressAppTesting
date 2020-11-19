/*
@title vst_ai.js
	
@author: Walter Leo \email{leo@battelleecology.org}\cr

@description: vst:ai app testing

@keywords Cypress, App, Testing
	

@To-do Add more tests


*/

const app_form_id = '85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
const email = Cypress.env('email')
const password = Cypress.env('password')


describe('Login to fulcrum, Select App, & Create new record', function(){
    before(() => {
        cy.clearLocalStorage()
        cy.login(email, password, app_form_id)
      })

      
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('_fulcrum_session', 'remember_user_token')
    })
    it('Meta data',() => {
                    //domain, site, filterdate, plot, measuredBy, /*recordedBy,*/  date, protocol
        //DEV
        //cy.vst_ai_meta('D20', 'PUUM', '2020-10-29', 'PUUM, PUUM_031, November 2, 2020, tower',
        //'Donoso, Evan, donoso@battelleecology.org',/*'Donoso, Evan, donoso@battelleecology.org',*/
        // '2020-11-03', '2020 - NEON.DOC.000987vJ'
        //)
        cy.vst_ai_meta('D19', 'BONA', '2020-08-29', 'BONA, BONA_001, September 30, 2020, distributed',
        'Baldwin, Harper, baldwinh@battelleecology.org',/*'Donoso, Evan, donoso@battelleecology.org',*/
         '2020-11-03', '2020 - NEON.DOC.000987vJ'
        )


        cy.parent_to_child('Apparent Individuals: Woody Stems (trees, shrubs, saplings, lianas)')
    })
    it('Status 9 greater than',() =>{
        const vst_ai = Cypress.env('vst_ai')
        var gfs_long = [ '(mbt) multi-bole tree', '(sbt) single bole tree', '(smt) small tree',
         '(sap) sapling', '(sis) single shrub','(lia) liana', '(sms) small shrub']
        var gf = ['mbt', 'sbt', 'smt', 'sap', 'sis', 'lia', 'sms']
        var regExp = /\(([^)]+)\)/; //extracts value from within ()  
         

        var gfArr =  Array.from(Array(gfs_long.length).keys())
        cy.wrap(gfArr).each((index2) => { // A for loop of growthforms

            //console.log('the array I would like to put in invalid')
            var fields = vst_ai["|9|10|"][gf[index2]]["greater"]
            //console.log(fields)
            cy.add_child()
            cy.recordlink('tagID_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')
            cy.choicefield('growthForm', gfs_long[index2]).wait(1000)
            cy.choicefield('plantStatus', '9 - Live, broken bole').wait(2000)
            console.log(gf[index2])
            console.log(vst_ai["label"])
            if(gf[index2] == 'mbt'){
                console.log('boles are broken')
                //cy.popup('All the boles are broken')
                cy.popup('All the boles are broken')
            }
            cy.yesno('length > 130 cm', 'Greater Than').wait(1000)
            //var defaults = 
            //var no_defaults = fields
            cy.choicefield('Changed measurement location','')
            var fields = fields.filter(function(e) {
                return this.indexOf(e) < 0;
              },
              ["changed_measurement_location","length"])

            cy.invalid(fields)
            cy.choicefield('Changed measurement location','noChange')              
            cy.hidden('maxcrowndiameter')
            cy.hidden('ninetycrowndiameter')           
            console.log('test')
            console.log(vst_ai["label"])
            console.log("test2")
            console.log(vst_ai["label"]["length"])
            fields.forEach(e => e.replace(e,vst_ai["label"][e]))
            console.log(fields)
            var fieldsArr =  Array.from(Array(fields.length).keys())           
            cy.wrap(fieldsArr).each((index3) => { // A for loop of growthforms
                var field = fields[index3]
                console.log(field)
                
                var value = vst_ai["|9|10|"][gf[index2]]["g_values"][index3]
                console.log(value)
                
                if(vst_ai.field_type.text.includes(field)){
                    cy.text(field, value)
                }else if(vst_ai.field_type.yesno.includes(field)){
                    cy.yesno(field, value)
                }else if(vst_ai.field_type.choicefield.includes(field)){
                    cy.choicefield(field, value)
                }
            })//end of measurment fields for loop            
            //cy.save_child(1)

        })// end of for loop 
    })
})