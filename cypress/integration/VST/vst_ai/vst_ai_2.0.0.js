/* @title
VST AI update v2.0.0 Cypress tests

@author
Walter Leo
email{leo@battelleecology.org}cr

@description
Cypress tests based on FS review


@keywords
cypress, app testing, javascript, fulcrum, vst, apparent individuals

@To-do
*/

const app_form_id = '85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
const email = Cypress.env('email')
const password = Cypress.env('password')
const vst_ai = Cypress.env('vst_ai')

describe('VST AI v2.0.0 FS Review', function(){
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
        cy.parent_to_child('Apparent Individuals: Woody Stems (trees, shrubs, saplings, lianas)')
    })
    it('2nd bole == status 8',() => {
         
        cy.add_child()
        cy.hyperlink('clear_default_values')        
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.choicefield('plantstatus', '1').wait(2000)
        cy.choicefield('growthform_select', 'lia').wait(1000)
        cy.text("stemdiameter",5)
        cy.text("measurementheight",100)
        cy.choicefield("liana_measurement_strategy","B - twining")
        cy.yesno("addstems","Yes")
        cy.save_child()
        //child 2
        cy.add_child()
        cy.choicefield('plantstatus', '8')
        cy.popup('No')
        cy.popup('No')
        cy.popup('No')
        cy.choicefield('plantstatus', '7').wait(2000)
        cy.text("stemdiameter",5)
        cy.text("measurementheight",100)
        cy.yesno("addstems","No")
        cy.text("remarks", "Sloth damage")
        cy.save_child()
    })
    it('addstems not required',() => {
        cy.add_child()
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.choicefield('plantstatus', '1').wait(2000)
        cy.choicefield('growthform_select', 'sis').wait(1000)
        cy.required("addstems", "false")
    })
    it('Allow vdbaseheight to be 0',()=>{ //should be able to save
        cy.choicefield('shape','columnar')  
        cy.text('stemdiameter', 5)
        cy.text("measurementheight", 120)
        cy.text("basalstemdiameter", 10)
        cy.text("basalstemdiametermeasurementheight", 30)     
        cy.text('vdapexheight', 5)
        cy.text('vdbaseheight',0)
        cy.text('maxcrowndiameter',5)
        cy.text('ninetycrowndiameter',2)
        cy.choicefield('canopyposition','Full sun')        
        cy.yesno("addstems","Yes")
        cy.save_child()
    })
    it('Secondary sis stem',()=>{ //forgo option should not appear
        cy.add_child()
        cy.choicefield('plantstatus', '8')
        cy.popup('No')
        cy.popup('No')
        cy.popup('No')
    })
    it('gf does not blank',() => {
        cy.equal('choicefield', 'growthform_select', 'sis')          
    })
    it('Prevent saving if no record is needed',() => { 
        cy.choicefield('plantstatus', '16')
        cy.popup('Yes')
        //cy.popup('Yes')
        //cy.popup('Yes')
        cy.save_child()
        cy.popup('Okay')
        cy.close_child()
        cy.popup('Yes')    
    })
    it('sis elp shape secondary',() => {
        cy.add_child()
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.choicefield('plantstatus', '1')
        cy.choicefield('growthform_select', 'sis')
        cy.choicefield('shape', 'ellipsoid or sphere')
        cy.invalid(['basecrownheight'])
        cy.text('stemdiameter', 5)
        cy.text("measurementheight", 120)
        cy.text("basalstemdiameter", 10)
        cy.text("basalstemdiametermeasurementheight", 30)     
        cy.text('vdapexheight', 5)
        cy.text('vdbaseheight',0)
        cy.text('maxcrowndiameter',5)
        cy.text('ninetycrowndiameter',2)
        cy.text('basecrownheight', 4)
        cy.choicefield('canopyposition','Full sun')        
        cy.yesno("addstems","Yes")
        cy.save_child()       
        
        cy.add_child()
        cy.choicefield('plantstatus', '1')
        cy.hidden('basecrownheight')
        cy.text('stemdiameter', 5)
        cy.text("measurementheight", 120)
        cy.text("basalstemdiameter", 10)
        cy.text("basalstemdiametermeasurementheight", 30) 
        cy.yesno("addstems","No")    
        //cy.text('vdapexheight', 5)
        //cy.text('vdbaseheight',0)
        cy.save_child()
    })
    it('sis icn shape secondary',() => {
        cy.add_child()
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.choicefield('plantstatus', '1')
        cy.choicefield('growthform_select', 'sis')
        cy.choicefield('shape','inverted cone')
        cy.invalid(['maxbasecrowndiameter', 'ninetybasecrowndiameter'])
        cy.text('stemdiameter', 5)
        cy.text("measurementheight", 120)
        cy.text("basalstemdiameter", 10)
        cy.text("basalstemdiametermeasurementheight", 30)     
        cy.text('vdapexheight', 5)
        cy.text('vdbaseheight',0)
        cy.text('maxcrowndiameter',7)
        cy.text('ninetycrowndiameter',2)
        cy.text('maxbasecrowndiameter', 6)
        cy.text('ninetybasecrowndiameter', 2)
        cy.choicefield('canopyposition','Full sun')        
        cy.yesno("addstems","Yes")
        cy.save_child()       
        
        cy.add_child()
        cy.choicefield('plantstatus', '1')
        cy.hidden('maxbasecrowndiameter')
        cy.hidden('ninetybasecrowndiameter')
        cy.text('stemdiameter', 5)
        cy.text("measurementheight", 120)
        cy.text("basalstemdiameter", 10)
        cy.text("basalstemdiametermeasurementheight", 30)  
        //cy.text('vdapexheight', 5)
        //cy.text('vdbaseheight',0)
        cy.save_child()
    })
    it('secondary stem <130',() => {//should prevent saving
        cy.add_child()
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.choicefield('plantstatus', '9')
        cy.yesno('length','No')
        cy.popup('Okay')
        cy.save_child()
        cy.popup('Okay')
        cy.close_child()
        cy.popup('Yes')            
    })
    it('sms field test',() => {
        cy.add_child()
        cy.hyperlink('clear_default_values').wait(1000)       
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.choicefield('growthform_select', 'sms')
        cy.choicefield('growthform_select', 'sms')
        cy.choicefield('plantstatus', '9')
        cy.choicefield('plantstatus', '9')
        cy.yesno('length', 'Yes')
        cy.invalid(['maxcrowndiameter', 'ninetycrowndiameter'])
        cy.close_child()
        cy.popup('Yes')    
    })
    it('no sis basal stem measurments',() => {
        cy.add_child()
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.choicefield('growthform_select', 'sis')
        cy.choicefield('plantstatus', '1')
        cy.choicefield('shape','columnar')  
        cy.text('stemdiameter', 5)
        cy.text("measurementheight", 120)     
        cy.text('vdapexheight', 5)
        cy.text('vdbaseheight',0)
        cy.text('maxcrowndiameter',5)
        cy.text('ninetycrowndiameter',2)
        cy.choicefield('canopyposition','Full sun')        
        cy.yesno("addstems","No")
        cy.invalid(["basalstemdiameter", "basalstemdiametermeasurementheight"])
        cy.save_child()    
    })
    it('break height cannot be greater than height',() => {
        cy.add_child()
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.choicefield('growthform_select', 'sbt')
        cy.choicefield('plantstatus', '9')
        cy.yesno('length', 'Yes')
        cy.text('measurementheight', 120)
        cy.text('stemdiameter', 20)
        cy.text('vdapexheight', 9)
        cy.text('vdbaseheight', -2)
        cy.text('vdapexbreakheight', 10)
        cy.text('vdbasebreakheight', -2)
        cy.text('breakdiameter', 5)
        cy.choicefield('canopyposition', 'Full sun')
        cy.invalid(['Break height'])
        cy.text('vdapexheight', 0)
        cy.text('remarks', 'remarks')
        cy.save_child()
    })
    it('addstems defaults to Yes when mbt ',() => {
        cy.add_child()
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.choicefield('plantstatus', '1')
        cy.choicefield('growthform_select', 'mbt')
        //cy.equal('yesno', 'addstems', 'Yes')
    })
    it('able to save mbt stem 2 with no tagid?',() => {
        cy.text('measurementheight', 120)
        cy.text('stemdiameter', 20)
        cy.text('vdapexheight', 9)
        cy.text('vdbaseheight', -2)
        cy.text('maxcrowndiameter',7)
        cy.text('ninetycrowndiameter',2)
        cy.choicefield('canopyposition', 'Full sun')
        cy.save_child()

        cy.add_child()
        cy.choicefield('plantstatus', '1')
        cy.text('measurementheight', 120)
        cy.text('stemdiameter', 20)
        cy.yesno("addstems","No")
        cy.invalid(['TagID'])
        cy.recordlink('tagid_select', 'BONA_001, 01403, 31, PIMA, 2017', 'select', 'click')//.wait(5000)
        cy.save_child()
    })
    it('end of metadata',() => {
        cy.child_to_parent()
        cy.recordlink('recordedby_link', 'Baldwin, Harper, baldwinh@battelleecology.org', 'select','click')
        cy.save_parent()    
    })
})
