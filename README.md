# NEON CypressAppTesting
To get started with Cypress please watch this video: https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell.
This site also includes all the documentation you will need for custom commands.  This repo is mostly devoted to testing Fulcrum apps and all the custom cypress commands are made for it.

## Getting Started: 
  1) Download and install [node.js](https://nodejs.org/en/download/) onto your computer.
  2) Clone this repo onto your computer. 
  3) Navigate to the root of the directory and install cypress using 
  ```bash
  $ npm install --save cypress
  ```
  4) In the root, install the directory's dependancies using 
  ```bash
  $ npm install
  ```
  5) In the root, create/edit a file called 'cypress.json' and ensure it contains this:
  ```json
  {
    "waitForAnimations": true,
    "defaultCommandTimeout": 10000,
    "pageLoadTimeout": 30000,
    "env":{
        "email":"your_fulcrum_email@yourdomain.com",
        "password":"your_password"
    }
  }
```
  
  **Don't worry this file is gitignored**
    
## Using Cypress: 
  1) Save all tests within the 'integration' folder within a folder for its app suite.
  2) Add all new commands to the 'support/commands.js' file
  3) Add all environmental variables to the 'cypress.json' file
  3) Everytime your test or commands are saved while the Cypress GUI is open, it listens and will re run all your tests.
  4) Write tests so each it statement has a different test within it
  5) Lost as to how to do somthing? Check out this [repo](https://github.com/cypress-io/cypress-example-recipes)
  6) When you want to test if your test is working, open up the GUI by navigating to the root of the directory and typeing
  ```bash
  $ npx cypress open
  ```
  
  **"Please note that any appearance of danger is merely a device to enhance your testing experience." -GLaDOS**
  
