import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

import config from '../../config/config'
import User from '../models/user.model'
import decodeHelper from '../helpers/decodeHelper'

const postSignin = async (req, res) => {
    try {
        const credentials = req.body
        const authObj = decodeHelper.decodeJwt(credentials.credential) // { payload: { email, name } }
        const { email, name, sub } = authObj.payload

        // create signature using google id
        const token = await jwt.sign(sub, config.jwtSecret)

        let user = await User.findOne({ gid: sub }).exec()
        
        if (!user) {
            user = new User({ email: email, name: name, gid: sub })
            await user.save()
        } 

        //establish user session
        res.cookie('t', token, { httpOnly: true })
        return res.status(200).json({
            token,
            user: { _id: user._id, name: user.name, email: user.email, },
        })
    } catch(err) {
        console.log("from postSignin ", err)
    }
}

const signout = async (req, res) => {
    try {
        res.clearCookie('t')
        return res.status(200).json({ message: 'sign out successful.' })
    } catch(err) {
        console.log(err)
    }
}

const isAuthenticated = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    requestProperty: 'auth',  //decoded token saved in req.auth = '105064005930977338430'
})

const hasAuthorization = (req, res, next) => {
    if (req.auth && req.user && req.auth === req.user.gid) {
        next()
    } else {
        return res.status(401).json({ error: 'No authorization' })
    }
}

export default { postSignin, signout, isAuthenticated, hasAuthorization }