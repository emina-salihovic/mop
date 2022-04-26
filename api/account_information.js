process.env.NODE_ENV = 'test' //@todo add dotenv for .env file support

let faker = require('@faker-js/faker').faker
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let expect = chai.expect
let config = require('./config')

chai.use(chaiHttp)

describe('Account Information', () => {
    describe('/PUT /account/profile', () => {
        it('it should update user profile information', async () => {

            let user = {
                email: faker.internet.email(),
                name: faker.name.firstName(),
                password: 'Test123!',
                phoneNumber: faker.phone.phoneNumber('+123############')
            }

            let agent = await chai.request.agent(config.apiBaseUrl)

            await agent
                .post('/account/register')
                .send(user)

            let response = await agent
                .post('/account/login')
                .send(user)

            let accessToken = response.body.data.accessToken

            let newAddress = 'Zmaja od Bosne 7A'
            let newName = 'Ministry of Programming'

            let res = await agent.put('/account/profile')
                .set({ "Authorization": `Bearer ${accessToken}` })
                .send({
                    address: newAddress,
                    name: newName
                })

            let getProfileResponse = await agent.get('/account/profile')
                .set({ "Authorization": `Bearer ${accessToken}` })
                .send()

            getProfileResponse.should.have.status(200)
            getProfileResponse.body.should.be.a('object')
            getProfileResponse.body.should.have.property('data').that.includes.all.keys(['name', 'address'])

            getProfileResponse.body.data.should.deep.include({ name: newName })
            getProfileResponse.body.data.should.deep.include({ address: newAddress })

            expect(getProfileResponse).to.be.json
        })

     
    })
})