process.env.NODE_ENV = 'test'; //@todo add dotenv for .env file support

let faker = require('@faker-js/faker').faker
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect
let config = require('./config')

chai.use(chaiHttp);

describe('Change Password', () => {
    describe('/POST /account/change-password', () => {
        it('it should change an existing user password', async () => {

            let user = {
                email: faker.internet.email(),
                name: faker.name.firstName(),
                password: 'Test123!',
                phoneNumber: faker.phone.phoneNumber('+123############')
            }

            let agent = await chai.request.agent(config.apiBaseUrl)

            await agent
                .post('/account/register')
                .send(user);

            let loginResponse = await agent
                .post('/account/login')
                .send(user)

            let accessToken = loginResponse.body.data.accessToken

            let changePasswordResponse = await agent.post('/account/change-password')
                .set({ "Authorization": `Bearer ${accessToken}` })
                .send({
                    newPassword: 'New123!',
                    password: user.password,
                })

            changePasswordResponse.should.have.status(202);
            changePasswordResponse.body.should.be.a('object');
            expect(changePasswordResponse).to.be.json;
        })
    })
})