process.env.NODE_ENV = 'test'; //@todo add dotenv for .env file support

let faker = require('@faker-js/faker').faker
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect
let config = require('./config')

chai.use(chaiHttp);

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
                .send(user);

            let res = await chai.request(config.apiBaseUrl) //@todo use base url from config/env
                .post('/account/login')
                .send({
                    email: user.email,
                    password: user.password,
                })

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').that.includes.all.keys(['accessToken', 'refreshToken']);
            expect(res).to.be.json;
        })
    })
})