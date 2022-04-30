process.env.NODE_ENV = 'test' //@todo add dotenv for .env file support

let faker = require('@faker-js/faker').faker
let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = chai.expect
let config = require('./config')

chai.use(chaiHttp)

describe('Login', () => {
    describe('/POST /account/login', () => {
        it('it should log in an existing user account', async () => {

            let user = {
                email: faker.internet.email(),
                name: faker.name.firstName(),
                password: 'Test123!',
                phoneNumber: faker.phone.phoneNumber('+123############')
            }

            await chai.request(config.apiBaseUrl)
                .post('/account/register')
                .send(user)

            let res = await chai.request(config.apiBaseUrl) 
                .post('/account/login')
                .send({
                    email: user.email,
                    password: user.password
                })

            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('data').that.includes.all.keys(['accessToken', 'refreshToken'])
            expect(res).to.be.json
        })

        it('it should not log in a user account with empty data', async () => {

            let res = await chai.request(config.apiBaseUrl) 
                .post('/account/login').send({})

            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.error.validation.should.deep.include({
                Email: "email_required",
                Password: "password_required"
            })

        })

        it('it should not log in a user account with invalid email format', async () => {

            let res = await chai.request(config.apiBaseUrl) 
                .post('/account/login').send({
                    email: 'invalid@',
                    password: 'Test123!'
                })

            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.error.validation.should.deep.include({
                Email: "email_email"
            })

        })

        it('it should not log in a user account with a user that does not exist', async () => {

            let res = await chai.request(config.apiBaseUrl) 
                .post('/account/login').send({
                    email: 'unexistingUser@test.com',
                    password: 'Test123!'
                })

            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.error.cause.cause.should.deep.include({ message: "user does not exist" })

        })

        it('it should not log in a user with the wrong password', async () => {

            let user = {
                email: faker.internet.email(),
                name: faker.name.firstName(),
                password: 'Test123!',
                phoneNumber: faker.phone.phoneNumber('+123############')
            }

            await chai.request(config.apiBaseUrl)
                .post('/account/register')
                .send(user)

            let res = await chai.request(config.apiBaseUrl) 
                .post('/account/login')
                .send({
                    email: user.email,
                    password: "WrongPassword123!"
                })

            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.error.cause.cause.should.deep.include({ message: "passwords don't match"})
        })

    })
})