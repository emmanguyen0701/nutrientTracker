import { signOut } from "./api-auth"

const auth = {
    authenticate: (jwt, cb) => {
        if (window) {
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
            cb()
        }
    },
    isAuthenticated: () => {
        if (!window) {
            return false
        }
        return JSON.parse(sessionStorage.getItem('jwt'))
    },
    clearJWT: (cb) => {
        if (window) {
            sessionStorage.removeItem('jwt')
            cb()
            signOut()
        }
    }
}

export default auth