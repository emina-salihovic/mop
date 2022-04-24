process.env.NODE_ENV = 'test'; //@todo add dotenv for .env file support

let faker = require('@faker-js/faker').faker
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
let config = require('./config')

chai.use(chaiHttp);

describe('Signup', () => {
    describe('/POST /account/register', () => {
        it('it should register a new user account', async () => {

            let agent = await chai.request.agent(config.apiBaseUrl)

            let res = await agent.post('/account/register')
                .send({
                    email: faker.internet.email(),
                    name: faker.name.firstName(),
                    password: 'Test123!',
                    phoneNumber: faker.phone.phoneNumber('+123############')
                })

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').that.includes.all.keys(['accessToken', 'refreshToken']);
            expect(res).to.be.json;
        });

        it('it should not register a new user account with empty data', async () => {

            let agent = await chai.request.agent(config.apiBaseUrl)

            let res = await agent.post('/account/register').send({})

            res.should.have.status(400)
            expect(res).to.be.json

            res.body.error.validation.should.deep.include({
                Email: "email_required",
                Name: "name_required",
                Password: "password_required",
                PhoneNumber: "phonenumber_required"
            })
        })

        it('it should not register a new user account with invalid email', async () => {

            let agent = await chai.request.agent(config.apiBaseUrl)

            let res = await agent.post('/account/register').send({
                email: 'invalid@',
                name: faker.name.firstName(),
                password: 'Test123!',
                phoneNumber: faker.phone.phoneNumber('+123############')
            })

            res.should.have.status(400)
            expect(res).to.be.json

            res.body.error.validation.should.deep.include({
                Email: "email_email"
            })
        })

        it('it should not register a new user account with invalid phone number format', async () => {

            let agent = await chai.request.agent(config.apiBaseUrl)

            let res = await agent.post('/account/register').send({
                email: faker.internet.email(),
                name: faker.name.firstName(),
                password: 'Test123!',
                phoneNumber: '!'
            })

            res.should.have.status(400)
            expect(res).to.be.json

            res.body.error.cause.should.deep.include({ message: "invalid phone number" })
        })

        it('it should not register a user with an already used email', async () => {

            let user = {
                email: faker.internet.email(),
                name: faker.name.firstName(),
                password: 'Test123!',
                phoneNumber: faker.phone.phoneNumber('+123############')
            }

            await chai.request(config.apiBaseUrl)
                .post('/account/register')
                .send(user);

            let res = await chai.request(config.apiBaseUrl).post('/account/register')
                .send({
                    email: user.email,
                    name: faker.name.firstName(),
                    password: 'Test123!',
                    phoneNumber: faker.phone.phoneNumber('+123############')
                })

            res.should.have.status(400)
            expect(res).to.be.json
            res.body.error.cause.should.deep.include({ message: "user already exists" })

        })

    })
})