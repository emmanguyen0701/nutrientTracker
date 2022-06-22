import queryString from 'query-string'

const addFoodToDiary = async (food, credential) => {
    try {
        const response = await fetch('/api/diary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${credential.token}`,
            },
            body: JSON.stringify(food)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const getDiary = async (signal, user, tokenObj, params) => {
    try {
        const query = queryString.stringify(params)
        const response = await fetch(`/api/diary/${user.userId}?${query}`, {
            method: 'GET',
            mode: 'cors',
            signal: signal,
            headers: {
                Authorization: `Bearer ${tokenObj.token}`
            }
        })
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err)
    }
}

const deleteItemFromDiary = async (user, item, tokenObj) => {
    try {
        const response = await fetch(`/api/diary/${user.userId}/${item.itemId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${tokenObj.token}`
            }
        })
        return await response.json()
    } catch(err) {
        console.log('from deleteItemFromDiary', err)
    }
}

export { addFoodToDiary, getDiary, deleteItemFromDiary }