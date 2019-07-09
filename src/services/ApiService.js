import axios from 'axios'
import {getRestApiBaseUrl} from './ConstantService'

class ApiService {
    get(url) {
        let restApiEndPoint = this.getRestEndPointUrl(url)
        return axios.get(restApiEndPoint)
            .then(response => {return this.onSuccess(response)})
            .catch(error => {return this.onError(error)})
    }

    delete(deleteUrl) {
        return axios.delete(deleteUrl)
        .then(response => {return this.onSuccess(response)})
        .catch(error => {return this.onError(error)})
    }
    
    post(url, data) {
        return axios.post(url, data)
        .then(response => {return this.onSuccess(response)})
        .catch(error => {return this.onError(error)})
    }
     
    put(url, data) {
        let restApiEndPoint = this.getRestEndPointUrl(url)
        return axios.put(restApiEndPoint, data)
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