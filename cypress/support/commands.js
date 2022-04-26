import { faker } from '@faker-js/faker';
import * as loginPage from "../support/objects/login";

Cypress.Commands.add('signup', (user) => {
    return cy.request({
        method: 'POST',
        url: Cypress.config('apiBaseUrl') + '/account/register',
        body: user
    })
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login')

    loginPage.enterEmail(email)
    loginPage.enterPassword(password)

    loginPage.clickOnLogInButton()

    cy.url().should('contain', '/events')
})

Cypress.Commands.add('logout', () => {
    cy.visit('/settings')
    cy.get("button[data-testid='']").click()
    cy.url().should('contain', '/login')
})

Cypress.Commands.add('fakeUserData', () => {
    return {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        password: 'Test123!',
        confirmPassword: 'Test123!',
        phoneNumber: faker.phone.phoneNumber('+123############')
    }
})