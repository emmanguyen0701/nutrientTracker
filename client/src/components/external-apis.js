import queryString from 'query-string'

const getFoodBySearchQuery = async (params) => {
    try {
        const query = queryString.stringify(params)
        const res = await fetch(`/api/externals/usda?${query}`)
        return await res.json()
    } catch(err) {
        console.log(err)
    }
}

export { getFoodBySearchQuery }