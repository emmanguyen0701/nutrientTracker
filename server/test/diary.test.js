process.env.NODE_DEV = 'test'
process.env.MONGODB_URI = 'mongodb+srv://emma2:9V8X3Q86aCUQVvhi@cluster0.pe3wy.mongodb.net/testDb?retryWrites=true&w=majority'

if (!global.Promise) {
    global.Promise = require('promise');
}

import mongoose from 'mongoose'
import chai, { assert } from 'chai'
import chaiHttp from 'chai-http'
import jwt from 'jsonwebtoken'
import queryString from 'query-string'

import server from '../express'
import config from '../../config/config'
import Diary from '../models/diary.model'
import User from '../models/user.model'
import { Food } from '../models/food.model'
import removeTime from '../helpers/removeTime'

chai.use(chaiHttp)

describe('Diary', () => {
    // connect to testDb before all tests
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URI)
        let user = await User.findOne({ gid: 123 })
        if (!user) {
            user = new User({ name: 'test', email: 'test@gmail.com', gid: 123 })
        }
        await user.save()  
        await Diary.deleteMany({})   
        await Food.deleteMany({})
    })

    describe('/POST diary', () => {
        it('Should POST diary', (done) => {
            User.findOne({ gid: '123' }, (err, user) => {
                const diary = {
                    user: user,
                    added_on: new Date(),
                    food: [{ name: 'apple', description: 'testing' }]
                }
                jwt.sign('123', config.jwtSecret, (err, token) => {
                    chai.request(server)
                    .post('/api/diary')
                    .set('Authorization', `Bearer ${token}`)
                    .send(diary)
                    .end((err, res) => {
                        if (err) console.log(err)
                        assert.equal(res.statusCode, 200)
                        assert.isObject(res.body)
                        assert.equal(res.body.user.toString(), user._id.toString())
                        done()
                    })
                })
            })
        })
    })

    describe('/GET/:id diary', () => {
        it('Should GET diary by ID', (done) => {
            User.findOne({ gid: '123' }, (err, user) => {
                const params = { added_on: removeTime(new Date()) }
                const query = queryString.stringify(params)
                Diary.find({ user: user, added_on: removeTime(new Date()) }, 
                (err, diary) => {
                    jwt.sign('123', config.jwtSecret, (err, token) => {
                        chai.request(server)
                        .get(`/api/diary/${user._id.toString()}/?${query}`)
                        .set('Authorization', `Bearer ${token}`)
                        .send(diary[0])
                        .end((err, res) => {
                            if (err) console.log(res)
                            assert.equal(res.statusCode, 200)
                            assert.isObject(res.body)
                            assert.equal(res.body.user.toString(), user._id.toString())
                            done()
                        })
                    })
                })
            })
        })
    })

    describe('/DELETE/:userId/:item diary', () => {
        it ('Should delete a food item by ID in diary', async () => {
            const user = await User.findOne({ gid: '123' })
            const diary = await Diary.find({ user: user, added_on: removeTime(new Date()) })
            const food = diary[0].food[0]
            const token = await jwt.sign('123', config.jwtSecret)
            const res = await chai.request(server)
                    .delete(`/api/diary/${user._id}/${food._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .catch(err => console.log(err))
            assert.equal(res.statusCode, 200)
            assert.equal(res.body.message, 'item deleted')
            
        })
    })
})