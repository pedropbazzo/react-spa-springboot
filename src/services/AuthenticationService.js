//import ApiService from "./ApiService";

class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username)
        
        /* this works only after I made the following changes to application.properties in SpringBoot
        spring.security.user.name=john.doe
        spring.security.user.password=password
        */
        //let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        //ApiService.setAxiosInterceptors(basicAuthHeader)
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


    getJwtToken() {
        //return sessionStorage.getItem('jwtToken')
        return 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huLmRvZSIsImV4cCI6MTU2NDkwMjM5NSwiaWF0IjoxNTY0ODg0Mzk1fQ.9hzpIv1m_sRV_gmCRTwa0wzcAykUxA4u0uzz_eIYwwjFyp04Y2zBezyeQLOLeeY_nYDgVpKvtAxdgbnpEu1S8w'
    }

}

export default new AuthenticationService()