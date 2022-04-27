/// <reference types="Cypress" />
//Login Objects and Actions

/**
 * Locators Section
 */

const nameField = () => cy.get("[data-testid=name-account-information]")
const emailField = () => cy.get("[data-testid=email-account-information]")
const phoneNumberField = () => cy.get("[data-testid=phone-number-account-information]").eq(0)
const addressField = () => cy.get("[data-testid=phone-number-account-information]").eq(1)
const updateButton = () => cy.get("[data-testid=account-information-button")

/**
 * Actions Section
 */
export function enterName(name = null) {
   if (name) {
      nameField().clear().type(name)
   }
   else {
      nameField().clear()
   }
}

export function enterAddress(address) {
   addressField().clear().type(address)
}

export function clickOnupdateButton() {
   updateButton().click()
}

/**
 * Assertion Section
 */
export function isAccountInformationUpdated(name, address) {
   nameField().should('have.value', name)
   addressField().should('have.value', address)
}
