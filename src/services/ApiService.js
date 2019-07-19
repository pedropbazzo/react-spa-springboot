import axios from 'axios'
import {getRestApiBaseUrl} from './ConstantService'
import AuthenticationService from './AuthenticationService';

class ApiService {
    get(url) {
        let restApiEndPoint = this.getRestEndPointUrl(url)
        //let username = 'user'
        //let password = 'password'
        return axios.get(restApiEndPoint, {
            headers: this.getAuthorizationHeader()
        })
        .then(response => {return this.onSuccess(response)})
        .catch(error => {return this.onError(error)})
    }

    delete(deleteUrl) {
        return axios.delete(deleteUrl, {
            headers: this.getAuthorizationHeader()
        })
        .then(response => {return this.onSuccess(response)})
        .catch(error => {return this.onError(error)})
    }
    
    post(url, data) {
        let restApiEndPoint = this.getRestEndPointUrl(url)
        return axios.post(restApiEndPoint, data, {
            headers: this.getAuthorizationHeader()
        })
        .then(response => {return this.onSuccess(response)})
        .catch(error => {return this.onError(error)})
    }
     
    put(url, data) {
        let restApiEndPoint = this.getRestEndPointUrl(url)
        return axios.put(restApiEndPoint, data, {
            headers: this.getAuthorizationHeader()
        })
        .then(response => {return this.onSuccess(response)})
        .catch(error => {return this.onError(error)})
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

    getAuthorizationHeader() {
        let username = 'user'
        let password = 'password'
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        return {
                "Content-Type": 'application/json',
                "Authorization": basicAuthHeader
        }
    }

    setAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if(AuthenticationService.isUserLoggedIn()) {
                    config.headers.Authorization = basicAuthHeader
                }
                return config
            }
        )
    }

    onSuccess(response) {
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