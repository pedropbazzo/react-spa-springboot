import ApiService from "./ApiService";

class AuthenticationService {
    onLoginSuccess(username, jwtToken) {
        sessionStorage.setItem('authenticatedUser', username)
        sessionStorage.setItem('jwtToken', jwtToken)
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
        sessionStorage.removeItem('jwtToken')
    }

    getLoggedInUser() {
        return sessionStorage.getItem('authenticatedUser')
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

        return ApiService.post("/login", {username, password})
            .then(response => {
                return response
            })
            .catch(() => {
                return null
            })
    }

}

export default new AuthenticationService()