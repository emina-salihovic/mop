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
export function enterCurrentPasswordField(password = null) {
    if (password) {
        currentPasswordField().clear().type(password)
    }
}

export function enterNewPasswordField(password = null) {
    if (password) {
        newPasswordField().clear().type(password)
    }
}

export function enterConfirmPasswordField(password = null) {
    if (password) {
        confirmPasswordField().clear().type(password)
    }
}

export function clickOnChangePasswordButton() {
    changePasswordButton().click()
}

export function isEmptyDataErrorMessageShown() {
    cy.contains('Current password is required.')
    cy.contains('New password is required.')
    cy.contains('Confirm password is required.')
}
