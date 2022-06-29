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
import { NutritionValue } from '../models/nutritionValue.model';
import removeTime from '../helpers/removeTime'

chai.use(chaiHttp)

describe('Nutrition', () => {
    // before all tests
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URI)
        await NutritionValue.deleteMany({})
        await Food.deleteMany({})
        await Diary.deleteMany({})
        let user = await User.findOne({ gid: 123 })
        if (!user) {
            user = new User({ name: 'test', email: 'test@gmail.com', gid: 123 })
            await user.save()  
        }
        const food  = new Food({
            name: 'apple', description: 'testing'
        })
        await food.save()

        const n1 = new NutritionValue({ 
            nutrientId: 2000, 
            nutrientName: 'Sugars', 
            unitName: 'G', 
            value: 13.3, 
            food: food._id
         })
        const n2 = new NutritionValue({ 
            nutrientId: 1093, 
            nutrientName: 'Salt', 
            unitName: 'MG', 
            value: 1.01, 
            food: food._id
         })
        await n1.save()
        await n2.save()

        let f = await Food.findById(food._id).populate('nutrients', 'nutrientId nutrientName unitName value')
        for (const n of f.nutrients) {
            f.nutrientValues.push(n)
        }
        await f.save()

        let diary = new Diary({
            user: user,
            added_on: removeTime(new Date()),
            food: [f]
        })
        await diary.save()
    })

    describe('/GET nutrient', () => {
        it('Should fail to get nutrients when no date specified', async () => {
            const token = await jwt.sign('123', config.jwtSecret)
            const res = await chai.request(server)
                            .get(`/api/nutrient/by/category?${undefined}`)
                            .set('Authorization', `Bearer ${token}`)
                            .catch(err => console.log(err))

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'No report found.')
        })
        it('Should get nutrients by category', async () => {
            const params = { dateSelected: removeTime(new Date()) }
            const query = queryString.stringify(params) 

            const token = await jwt.sign('123', config.jwtSecret)
            const res = await chai.request(server)
                            .get(`/api/nutrient/by/category?${query}`)
                            .set('Authorization', `Bearer ${token}`)
                            .catch(err => console.log(err))

            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.property(res.body, 'Salt')
            assert.propertyVal(res.body, 'Salt', 1.01)
            assert.property(res.body, 'Sugars')
            assert.propertyVal(res.body, 'Sugars', 13.3)
            assert.isUndefined(res.body['Saturated Fat'])
        })
    })
})