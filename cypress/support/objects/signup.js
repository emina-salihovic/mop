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

const registrationCode = () => cy.get("[data-testid=registration-code-mfa")
const verifyButton = () => cy.get("[data-testid=pba-signup-button")
const gotItButton = () => cy.get("button[data-testid=''")
const avatar = () => cy.get('a[href*="settings"]')


/**
 * Actions Section
 */
export function checkTermsAndConditions() {
    termsAndConditionsCheckbox().should('not.be.visible').check({ force: true }).should('be.checked')
}

export function clickOnSignUp() {
    signUpButton().click()
}

export function signUp(email = null, firstName = null, password = null, confirmPassword = null, phoneNumber = null) {

    if (email) {
        emailField().clear().type(email)
    }

    if (firstName) {
        nameField().clear().type(firstName)
    }

    if (password) {
        passwordField().clear().type(password)
    }

    if (confirmPassword) {
        confirmPasswordField().clear().type(confirmPassword)
    }

    if (phoneNumber) {
        phoneNumberField().clear().type(phoneNumber)
    }
}

export function goThroughSignUpProcess() {
    cy.url().should('contain', '/pba')
    registrationCode().type("9999")
    verifyButton().click()
    gotItButton().click()
    cy.url().should('contain', '/events')
    avatar().click()
}

/**
 * Assertion Section
 */
export function isEmptyDataErrorMessageShown() {
    cy.contains('Email is required.')
    cy.contains('Name is required.')
    cy.contains('Password is required.')
    cy.contains('Confirm password is required.')
    cy.contains('Phone number is required. Please use +123 format.')
    cy.contains('Please accept our Terms & Conditions.')
}

export function isUserSignedUp(name, email) {
    cy.contains(name)
    cy.contains(email)
}

