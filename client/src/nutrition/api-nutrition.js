import queryString from 'query-string'

export const getNutritionByCategory = async (tokenObj, params ,signal) => {
    try {
        const query = queryString.stringify(params)

        const res = await fetch(`/api/nutrient/by/category?${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenObj.token}`,
            },
            signal: signal,
        })
        return await res.json()
    } catch(err) {
        console.log(err)
    }
}