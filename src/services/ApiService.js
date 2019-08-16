import axios from 'axios'
import {getRestApiBaseUrl} from './ConstantService'
import AuthenticationService from './AuthenticationService';

class ApiService {
    get(url) {
        let restApiEndPoint = this.getRestEndPointUrl(url)
        
        return axios.get(restApiEndPoint, this.getApiHeaders())
            .then(response => {
                return this.onSuccess(response)
            })
            .catch(error => {
                return this.onError(error)
            })
    }

    delete(url) {
        let restApiEndPoint = this.getRestEndPointUrl(url)

        return axios.delete(restApiEndPoint, this.getApiHeaders())
            .then(response => {
                return this.onSuccess(response)
            })
            .catch(error => {
                return this.onError(error)
            })
    }
    
    post(url, data) {
        let restApiEndPoint = this.getRestEndPointUrl(url)
        
        return axios.post(restApiEndPoint, data, this.getApiHeaders())
            .then(response => {
                return this.onSuccess(response)
            })
            .catch(error => {
                return this.onError(error)
            })
    }
     
    put(url, data) {
        let restApiEndPoint = this.getRestEndPointUrl(url)
        
        return axios.put(restApiEndPoint, data, this.getApiHeaders())
            .then(response => {
                return this.onSuccess(response)
            })
            .catch(error => {
                return this.onError(error)
            })
    }

    
    /**
     * 
     * @param {String} apiEndPoint 
     * return String apiEndPoint
     * Values of apiEndPoint that are handled by this function
     * http://REST_API_BASE_URL/API_ENDPOINT (http://localhost/hello-world)
     * https://REST_API_BASE_URL/API_ENDPOINT (https://localhost/hello-world)
     * /API_ENDPOINT (/hello-world)
     * API_ENDPOINT (hello-world)
     */
    getRestEndPointUrl(apiEndPoint) {
        let restApiBaseUrl = getRestApiBaseUrl()
        if(apiEndPoint.indexOf(restApiBaseUrl) === -1) {
            // check if the Endpoint begins with '/'. If not, add '/'
            if(apiEndPoint.charAt(0) !== '/') {
                apiEndPoint = '/' + apiEndPoint
            }
            return restApiBaseUrl + apiEndPoint
        }
        return apiEndPoint
    }

    /*getAuthorizationHeader() {
        
        // need to revisit this, as hard coding values is never a good practice.
        // just putting it here to make sure REST API calls work
        
        let username = 'john.doe'
        let password = 'password'
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        return {
                "Content-Type": 'application/json',
                "Authorization": basicAuthHeader
        }
    }*/

    /*getJwtTokenAuthHeader() {
        return 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huLmRvZSIsImV4cCI6MTU2NDkwMjM5NSwiaWF0IjoxNTY0ODg0Mzk1fQ.9hzpIv1m_sRV_gmCRTwa0wzcAykUxA4u0uzz_eIYwwjFyp04Y2zBezyeQLOLeeY_nYDgVpKvtAxdgbnpEu1S8w'
    }*/

    /*setAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if(AuthenticationService.isUserLoggedIn()) {
                    config.headers.Authorization = basicAuthHeader
                }
                return config
            }
        )
    }*/

    getApiHeaders() {
        let headers = {}
        headers['Content-type'] = 'application/json'

        let jwtToken = AuthenticationService.getJwtToken()
        if(jwtToken) {
            headers['Authorization'] = `Bearer ${jwtToken}`
        }

        return {'headers' : headers}
    }

    onSuccess(response) {
        if(response.headers['new-jwt-token']) {
            sessionStorage.setItem('jwtToken', response.headers['new-jwt-token'])
        }
        return Promise.resolve(response.data);
    }

    onError(error) {
        // https://github.com/axios/axios#handling-errors
        
        let errorObj = {
            message: 'Something went wrong',
            status: 500
        }
        if(error.response) {
            errorObj.status = error.response.status
            if(error.response.data.message) {
                errorObj.message = error.response.data.message
            } else if(error.response.data.error) {
                errorObj.message = error.response.data.error
            }
        } else if(error.request) {
            errorObj.message = 'No response from the server'
        } 
        return Promise.reject(errorObj);
    }
}

export default new ApiService()