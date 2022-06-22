function getBadNutrients(nutrients) {
    const filteredNutrients = []
    let saturatedFat = {}
    let sodium = {}
    let sugar = {}
    saturatedFat = nutrients.find(nutrient => nutrient.nutrientId === 1258)
    sodium = nutrients.find(nutrient => nutrient.nutrientId === 1093)
    sugar = nutrients.find(nutrient => nutrient.nutrientId === 2000 || nutrient.nutrientId === 1063)
    filteredNutrients.push(saturatedFat, sodium, sugar)
    return filteredNutrients
}

export default getBadNutrients