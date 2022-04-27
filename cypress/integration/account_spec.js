import * as accountInformationPage from "../support/objects/account"

describe('Account informtion page: Verify the user', () => {
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

            let fakeUser = cy.fakeUserData().then(user => {
                cy.signup(user).then(response => {
                    cy.login(user.email, user.password)

                    cy.visit('/settings/account-information')
                })
            })
        })


    })

    it('can edit account information with valid data', () => {
        accountInformationPage.enterName('Emina Salihovic')
        accountInformationPage.enterAddress('Laticka 1')
        accountInformationPage.clickOnupdateButton()
        accountInformationPage.isAccountInformationUpdated('Emina Salihovic', 'Laticka 1')
    })

    it('can not edit account with empty data', () => {
        accountInformationPage.enterName()
        accountInformationPage.clickOnupdateButton()
        cy.contains('Full name is required.')
    })

})