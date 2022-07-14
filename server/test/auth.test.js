process.env.NODE_DEV = 'test'
process.env.MONGODB_URI = 'mongodb+srv://emma2:9V8X3Q86aCUQVvhi@cluster0.pe3wy.mongodb.net/testDb?retryWrites=true&w=majority'

if (!global.Promise) {
    global.Promise = require('promise');
}

import mongoose from 'mongoose'
import chai, { assert } from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import jwt from 'jsonwebtoken'

import server from '../express'
import config from '../../config/config'
import User from '../models/user.model'
import decodeHelper from '../helpers/decodeHelper'

chai.use(chaiHttp)

describe('User', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URI)
    })

    // before each test, clear the database
    beforeEach(async () => { 
        await User.deleteMany({})
    })
    
    describe('/POST signin user', () => {
        it('Should return saved user with Google credentials', async () => {
            const credentials = {}
            sinon.stub(decodeHelper, 'decodeJwt')
            .returns({
                header: {},
                payload: { email: 'test@gmail.com', name: 'test', sub: 123 }
            })
            const res = await chai.request(server)
                    .post('/auth/signin')
                    .send(credentials)
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.equal(res.body.user.email, 'test@gmail.com')     
            decodeHelper.decodeJwt.restore()
        })
        it('Should return a token to user', async () => {
            const credentials = {}
            sinon.stub(decodeHelper, 'decodeJwt')
            .returns({
                header: {},
                payload: { email: 'test@gmail.com', name: 'test', sub: 123 }
            })
            const myToken = await jwt.sign(123, config.jwtSecret)
            const res = await chai.request(server)
                    .post('/auth/signin')
                    .send(credentials)
            assert.equal(res.status, 200)
            assert.equal(res.body.token, myToken)
            decodeHelper.decodeJwt.restore()
        })
    })

    describe('/GET signout user', () => {
        it('Should clear the cookie and return corresponding message', async () => {
            const res = await chai.request(server)
                            .get('/auth/signout')
            
            assert.equal(res.body.message, 'sign out successful.')
        })
    })
})