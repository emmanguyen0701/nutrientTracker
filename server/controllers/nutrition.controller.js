import Diary from "../models/diary.model"
import { NutritionValue } from "../models/nutritionValue.model"
import User from "../models/user.model"

const getNutritionByCategory = async (req, res) => {
    const dateSelected = req.query.dateSelected
    try {
    /*
    1. Find all food in diary
    2. For each food, find the nutrition values
    3. Perform aggregation by nutrition values
    */
    const user = await User.findOne({ gid: req.auth }).exec()
    const diary = await Diary.find({ $and: [
        { user: user },
        { added_on: dateSelected }
    ]})

    let allNutrients = []
    if (!!diary.length  && !!diary[0].food.length) {
        for (const f of diary[0].food) {
            for (const n of f.nutrientValues) {
                const nutrient = await NutritionValue.findById(n._id)
                allNutrients.push(nutrient)
            }
        }      
    } else {
        return res.status(200).json({ error: 'No report found.' })
    }
    
    /* sum of each nutrient */
    const result = allNutrients.reduce((acc, cur) => {
        acc[cur.nutrientName] = acc[cur.nutrientName] || 0
        acc[cur.nutrientName] += cur.value
        return acc
    }, Object.create(null))

    return res.status(200).json(result) // result = { 'Salt': 10, 'Sugars': 10, 'Saturated Fat': 10 } 
    } catch(err) {
        console.log(err)
    }
}

export default { getNutritionByCategory }