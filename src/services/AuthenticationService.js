class AuthenticationService {
    registerSuccessfulLogin(username) {
        sessionStorage.setItem('authenticatedUser', username)
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
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
}

export default new AuthenticationService()