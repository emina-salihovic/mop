import * as loginPage from "../support/objects/login"

describe('Login page: Verify the user', () => {
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

    it('can login with valid data', () => {

        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {
                cy.login(user.email, user.password)

                cy.url().should('contain', '/events')
            })
        })
    })

    it('can not login with empty data', () => {

        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {
                cy.login(null, null, '/login')
                loginPage.isEmptyDataErrorMessageShown()
            })
        })
    })

    it('can not login with unexisting user email', () => {

        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {
                cy.login('not_a_user@gmail.com', user.password, '/login')

                cy.contains('Wrong email or password.')
            })
        })
    })

    it('can not login with invalid email format', () => {

        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {
                cy.login('invalid_email', user.password, '/login')

                cy.contains('Please enter a valid email.')
            })
        })
    })

    it('can not login with wrong password', () => {

        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {
                cy.login(user.email, 'WrongPassword123!', '/login')

                cy.contains('Wrong email or password.')
            })
        })
    })


})