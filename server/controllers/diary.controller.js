import { Food } from '../models/food.model'
import Diary from '../models/diary.model'
import User from '../models/user.model'
import { NutritionValue } from '../models/nutritionValue.model'
import removeTime from '../helpers/removeTime'

const getDiary = async (req, res) => {
    try {
        // get the date selected from the query
        const dateSelected = req.query.added_on

        // find diary belonging to the user making request at chosen date
        const diary = await Diary.find({ $and: [
            { user: req.params.userId },
            { added_on: dateSelected }
        ]})

        if (diary.length === 0) {
            return res.status(400).json({ error: 'Diary not found.' })
        }

        // populate the food with nutrient values 
        diary[0].food = await Promise.all(diary[0]?.food.map(async f => {
            f = await Food.findById(f._id)
                    .populate('nutrients', 'nutrientId nutrientName unitName value')
            f.nutrientValues = f.nutrients
    
            return f
        }))

        return res.status(200).json(diary[0])
    }  catch(err) {
        console.log("From backend getDiary: ", err)
    }
}

const addFoodToDiary = async (req, res) => {
    const { name, description, nutrients } = req.body
    // find food
    // if food not found create food and nutrition values
    // else add food to diary
    try {
        let nF
        let food = await Food.findOne({ description: description }).exec()
        if (!food) {
            food = new Food({ name, description })
            await food.save()

            // reconstruct the data to allow data manipulation at later stage
            if (!!nutrients?.length) {
                for (const nutrient of nutrients) {
                    if (nutrient) {
                        let { nutrientId, nutrientName, unitName, value } = nutrient
                        if (nutrientId === 2000 || nutrientId === 1063) {
                            nutrientName = 'Sugars'
                            nutrientId = 2000
                        }
                        if (nutrientId === 1258) {
                            nutrientName = 'Saturated Fat'
                        }
                        if (nutrientId === 1093) {
                            nutrientName = 'Salt'
                        }
                        const nutrientInDb = new NutritionValue({ nutrientId, nutrientName: nutrientName, unitName, value, food: food._id })
                        await nutrientInDb.save()
                    }
                }
            }
            
            nF = await Food.findById(food._id)
            .populate('nutrients', 'nutrientId nutrientName unitName value')

            for (const n of nF.nutrients) {
                nF.nutrientValues.push(n)
            }
  
            await nF.save()
        } else {
            nF = await Food.findById(food._id)
            .populate('nutrients', 'nutrientId nutrientName unitName value')
        }

        // find diary that belongs to user
        const user = await User.findOne({ gid: req.auth }).exec()

        let diary = await Diary.find({ $and: [
            { user: user }, { added_on: removeTime(new Date()) }
        ]})

        if (!!diary.length) {
            diary[0].food.push(nF)
            await diary[0].save()
        } else {
            diary = new Diary({ food: nF, user: user })
            await diary.save()
        }

        return res.status(200).json(diary)
    } catch(err) {
        console.log("From backend addFoodToDiary: ", err)
    }
}

const deleteItem = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).exec()
        const diary = await Diary.find({ $and: [
           { user: user }, { added_on: removeTime(new Date()) }
        ] })
        if (diary.length === 0) return res.status(400).json({ error: 'Diary not found.' })
        
        const index = diary[0].food.findIndex(f => f._id.toString() === req.params.itemId)
        diary[0].food.splice(index, 1)
        await diary[0].save()
        return res.json({ message: 'item deleted' })

    } catch(err) {
        console.log("From backend deleteItem: ", err)
    }
}

export default { getDiary, addFoodToDiary, deleteItem, }