
const app_form_id = '85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
const email = Cypress.env('email')
const password = Cypress.env('password')

describe('Description of overall tests', function(){
    before(() => {
        cy.clearLocalStorage()
        cy.login(email, password, app_form_id)
      })
    it('metadata',() => {
        cy.vst_ai_meta('D20', 'PUUM', '2020-10-29', 'PUUM, PUUM_031, November 2, 2020, tower',
         'Donoso, Evan, donoso@battelleecology.org', 'Donoso, Evan, donoso@battelleecology.org', '2020-11-03')
        cy.new_child('Apparent Individuals: Woody Stems (trees, shrubs, saplings, lianas)')
    })
    it('woody individual',() =>{
        cy.recordlink('tagID_select', 'PUUM_031, 01234, 31, ADTA, 2020', 'select', 'click')
        cy.choicefield('growthForm', '(sbt) single bole tree')
        cy.choicefield('plantStatus', '1- Live')
        cy.text('stemDiameter (0.1 cm)',30)        
        cy.text('measurementHeight (1 cm)',450)
        cy.text('vdApexHeight (0.1 m)',10)
        cy.text('vdBaseHeight (0.1 m)',-1)  
        cy.text('maxCrownDiameter (0.1 m)', 4)
        cy.text('ninetyCrownDiameter (0.1 m)', 1)
        cy.choicefield('canopyPosition', 'Open grown')
        cy.save_child()
        cy.child_to_parent()
    })
    it('nonwoody individual',() =>{
        cy.new_child('Apparent Individuals: Non-Woody Stems (cacti, ferns, palms etc.)')
        cy.choicefield('growthForm', 'tree fern')
        cy.choicefield('tagStatus', 'ok')
        cy.recordlink('tagID select', 'PUUM_031, 01235, 31, ADTR2, 2020', 'select', 'click')
        cy.choicefield('plantStatus', '1- Live')
        cy.choicefield('canopyPosition', 'Open grown')
        cy.text('stemDiameter (0.1 cm)',30)
        cy.text('stemLength (0.1m)', 10)
        cy.text('vdBaseHeight (0.1m)',-1)
        cy.text('vdApexHeight (0.1m)',10)
        cy.text('measurementHeight (1 cm)',450)
        cy.save_child()
        cy.child_to_parent()
        cy.recordlink('recordedBy', 'Mike', 'select', 'index', 1)
        cy.save_parent()        
    })
})