import * as loginPage from "../support/objects/login"

describe('Verify the LogIn Page', () => {
    beforeEach(() => {
        cy.window().then((window) => {
            window.sessionStorage.clear()
            window.localStorage.clear()
        })

        cy.visit('/login')

        cy.url().then(url => {
            if (!url.includes('login')) {
                cy.logout()
            }
        })
    })

    it('is visible', () => {
        loginPage.isLogInPageVisible()
    })

    it('can login when valid data is entered', () => {

        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {
                cy.login(user.email, user.password)
            })
        })
    })
})