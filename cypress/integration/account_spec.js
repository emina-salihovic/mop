import * as accountInformationPage from "../support/objects/account";
import * as loginPage from "../support/objects/login";

describe('Verify the Account Information Page', () => {  
    beforeEach(() => {
        cy.window().then((window) => {
            window.sessionStorage.clear();
            window.localStorage.clear();
        });
        
        cy.visit('/login');

        cy.url().then(url => {
            if (! url.includes('login')) {
                cy.logout()   
            }

            let fakeUser = cy.fakeUserData().then(user => {
                cy.signup(user).then(response => {
                    cy.login(user.email,user.password)
    
                    cy.visit('/settings/account-information')
                })
            })
        })


    })

    it('is visible', () => {
        accountInformationPage.isAccountInformationPageVisible()
    })

    it ('can be edited', () => {
        accountInformationPage.enterName('Emina Salihovic')
        accountInformationPage.enterAddress('Laticka 1')
        accountInformationPage.clickOnupdateButton()
        accountInformationPage.isAccountInformationUpdated('Emina Salihovic','Laticka 1')
    })
   
})