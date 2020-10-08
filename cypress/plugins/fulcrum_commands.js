/*
@title Fulcrum_Commands
	
@author: Walter Leo \email{leo@battelleecology.org}\cr

@description: Fulcrum specific Cypress functions

@keywords Cypress, App, Testing
	

@To-do Experiment more and add more functions for everyday use.  Create more functions to test visibility.  Design regex statement to find datanames rather than labels


*/

const app_form_id = '8e82b7a1-8d11-4bac-baad-de6b2c9d8681'//,'85b3dc9a-9dd1-4645-a4ce-da6f5f5a6092'
const email = 'leo@battelleecology.org'
const password = '1102189Wl!'

describe('Login to fulcrum, Select App, & Create new record', function(){
    it('Login to Fulcrum VST:AI[DEV]',() => {
        login(email, password, app_form_id, 10)
        new_record(3)
        choicefield('domainID personnel', 'D03')
        choicefield('Select a Site','DSNY',3)
        choicefield('nTransBoutType', 'No')
        recordlink('Select plotID','DSNY_001','Select', 'click')
        choicefield('boutType','microbes')
        choicefield('sampleTiming','peakGreenness')
        popup('Yes')
        //meta data
        new_child('SOP B: per sample', 3)
        choicefield('samplingImpractical', 'logistical', 6)
        choicefield('subplotID', '21')
        hidden('Toxicodendron Possible?')
        //readonly('setdate (fills on save)')
        time('collectTime', '15:32')
        //time('collectTime','15:30')
        date('collectDate','2020-09-15')
        //choicefield('domainid', 'D16')
        //choicefield('Select a siteID', 'WREF
        
        ////recordlink()
        ////yesno('Show help messages?', 'No')
        //date('Date', '2020-09-01', 2)
        //new_child('Apparent Individuals: Woody Stems (trees, shrubs, saplings, lianas)',4)
        //recordlink('tagID_select', '04088', 'Select', 6)
        //choicefield('growthForm', '(mbt) multi-bole tree')
        //choicefield('plantStatus', '1- Live',6)        
        //text('stemDiameter (0.1 cm)',30)
        //text('measurementHeight (1 cm)',80)
        //text('vdApexHeight (0.1 m)',10)
        //text('vdBaseHeight (0.1 m)',-1)  
        //text('maxCrownDiameter (0.1 m)',6)
        //text('ninetyCrownDiameter (0.1 m)',3)
        //choicefield('canopyPosition', 'Open grown')
        //yesno('addMultipleStems?', 'Yes')
        //save_child()
        //new_child('Apparent Individuals: Woody Stems (trees, shrubs, saplings, lianas)',4)
    })
})


