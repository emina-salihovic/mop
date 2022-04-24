/// <reference types="Cypress" />
//Login Objects and Actions

/**
 * Locators Section
 */

const emailField = () => cy.get("[data-testid=email-login]")
const passwordField = () => cy.get("[data-testid=password-login]")
const keepMeLoggedInCheckbox = () => cy.get("[type=checkbox]")
const logInButton = () => cy.get("[data-testid=login-button]")

 /**
  * Actions Section
  */
 export function enterEmail(email) {
     emailField().clear().type(email)

     //@todo return this;
 }
 
 export function enterPassword(password) {
     passwordField().clear().type(password)
 }

export function checkKeepMeLoggedInCheckbox() {
    keepMeLoggedInCheckbox().should('not.be.visible').check({ force: true }).should('be.checked')  
 }
 
 export function clickOnLogInButton() {
    logInButton().click()
 }
 
 /**
  * Assertion Section
  */
 export function isLogInPageVisible() {
     emailField().should('be.visible')
     passwordField().should('be.visible')
     logInButton().should('be.visible')
 }
