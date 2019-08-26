import ApiService from "./ApiService"
import StorageService from "./StorageService"

class AuthenticationService {
    onLoginSuccess(user, jwtToken) {
        //sessionStorage.setItem('authenticatedUser', JSON.stringify(user))
        //sessionStorage.setItem('jwtToken', jwtToken)

        StorageService.setItem('authenticatedUser', JSON.stringify(user))
        StorageService.setItem('jwtToken', jwtToken)
    }

    logout() {
        StorageService.removeItem('authenticatedUser')
        StorageService.removeItem('jwtToken')
    }

    getLoggedInUser() {
        let user = StorageService.getItem('authenticatedUser')
        return ((user) ? JSON.parse(user) : null)
    }

    getLoggedInUserId() {
        let user = this.getLoggedInUser()
        if(user === null || user === undefined) {
            return 0
        }
        return user.id
    }

    getLoggedInUserName() {
        let user = this.getLoggedInUser()
        if(user === null) {
            return ''
        }
        return user.username
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user === null) {
            return false
        }
        return true
    }


    getJwtToken() {
        return sessionStorage.getItem('jwtToken')
    }

    async login(username, password) {
        if(!username.trim().length || !password.trim().length) {
            return null
        }

        // return ApiService.post("/login", {username, password})
        //     .then(response => {
        //         return response
        //     })
        //     .catch(() => {
        //         return null
        //     })

        return ApiService.post("/login", {username, password})
    }

}

export default new AuthenticationService()