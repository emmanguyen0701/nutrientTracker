export const signIn = async (credentials) => {
    try {
        const res = await fetch('/auth/signin', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await res.json()

    } catch(err) {
        console.log('From signIn', err)
    }
}

export const signOut = async () => {
    try {
        const res = await fetch('/auth/signout')
        return await res.json()
    } catch(err) {
        console.log('From signOut', err)
    }
}