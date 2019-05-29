class AuthenticationService {
    registerSuccessfulLogin(username) {
        sessionStorage.setItem('authenticatedUser', username)
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }
}

export default new AuthenticationService()