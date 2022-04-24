/// <reference types="Cypress" />
//Forgot password Objects and Actions

/**
 * Locators Section
 */

const currentPasswordField = () => cy.get("[data-testid=password-change]")
const newPasswordField = () => cy.get("[data-testid=new-password-change]")
const confirmPasswordField = () => cy.get("[data-testid=confirm-password-change]")
const changePasswordButton = () => cy.get("[data-testid=change-password-button]")

 /**
  * Actions Section
  */
export function enterCurrentPasswordField(password) {
    currentPasswordField().clear().type(password)
}

export function enterNewPasswordField(password) {
    newPasswordField().clear().type(password)
}

export function enterConfirmPasswordField(password) {
    confirmPasswordField().clear().type(password)
}

export function clickOnChangePasswordButton() {
    changePasswordButton().click()
}

export function isChangePasswordPageVisible() {
    currentPasswordField().should('be.visible')
    newPasswordField().should('be.visible')
    confirmPasswordField().should('be.visible')
    changePasswordButton().should('be.visible')
}
 