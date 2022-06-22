import User from '../models/user.model'

const getUserById = async (req, res, next, userId) => {
    try {
        const user = await User.findById(userId).exec()
        if (!user) {
            return res.status(401).json({ error: 'User not found.' })
        }
        req.user = user
        next()
    } catch(err) {
        console.log("From getUserById", err)
    }
}

export default { getUserById }