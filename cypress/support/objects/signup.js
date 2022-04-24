/// <reference types="Cypress" />
//Signup Objects and Actions

/**
 * Locators Section
 */

const emailField = () => cy.get("[data-testid=email-signup]")
const nameField = () => cy.get("[data-testid=name-signup]")
const passwordField = () => cy.get("[data-testid=password-signup]")
const confirmPasswordField = () => cy.get("[data-testid=confirm-password-signup]")
const phoneNumberField = () => cy.get("[data-testid=phone-number-signup]")
const termsAndConditionsCheckbox = () => cy.get("[data-testid=terms-and-conditions-signup]")
const signUpButton = () => cy.get("[data-testid=signup-button]")

 
 /**
  * Actions Section
  */
 export function enterEmail(email) {
     emailField().clear().type(email)
 }

 export function enterName(name) {
     nameField().clear().type(name)
 }
 
 export function enterPassword(password) {
     passwordField().clear().type(password)
 }

 export function confirmPassword(password) {
    confirmPasswordField().clear().type(password)
}

export function enterPhoneNumber(password) {
    phoneNumberField().clear().type(password)
}

export function checkTermsAndConditions() {
    termsAndConditionsCheckbox().should('not.be.visible').check({ force: true }).should('be.checked')  
 }
 
 export function clickOnSignUp() {
    signUpButton().click()
 }
 
 /**
  * Assertion Section
  */
 export function isSignUpPageVisible() {
     emailField().should('be.visible')
     nameField().should('be.visible')
     passwordField().should('be.visible')
     confirmPasswordField().should('be.visible')
     phoneNumberField().should('be.visible')
     signUpButton().should('be.visible')
 }