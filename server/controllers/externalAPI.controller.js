import fetch from "node-fetch"

const handleUsdaApiCall = async (req, res) => {
    try {
        const query = req.query.food
        const resUsda = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_USDA_CLIENT_KEY}&query=${query}&pageSize=1&dataType=Foundation,Branded&sortBy=dataType.keyword&sortOrder=desc`)
        const data = await resUsda.json()

        return res.status(200).json(data)
    } catch(err) {
        console.log(err)
    }
}

export default { handleUsdaApiCall }