# NEONscienceCypressAppTesting
To get started with Cypress please watch this video: https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell.
This site also includes all the documentation you will need for custom commands.

Getting Started: 
  1) Download and install node.js onto your computer.
  2) Clone this repo onto your computer. 
  3) You will notice the cypress file is already in it.  To open the Cypress GUI, navigate to the root of the repo using the command line and run 'npx cypress open'. 
    a. If this continues to not work you may need to clear the cache 'npx cypress cache clear'
    b. If this does not work you may need to reinstall cypress using 'npm install cypress'
    
Using cypress: 
  1) Save all tests within the 'integration' folder within a folder for its app grouping.
  2) Add all new commands to the 'support/commands.js' file
  3) Everytime your test or commands are saved while the Cypress GUI is open, it listens and will re run all your tests.
  
