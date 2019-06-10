import axios from 'axios'
import {REST_API_URL} from '../App.constant'

class ApiService {
    get(url) {
        let restApiEndPoint = this.getRestEndPointUrl(url)
        return axios.get(restApiEndPoint)
            .then(response => {return this.onSuccess(response)})
            .catch(error => {return this.onError(error)})
    }
    
    /*post(url, data) {
        return axios.post(url, data)
    }
     
    put(url, data) {
        return axios.put(url, data)
    }
     
    delete(url) {
        return axios.delete(url)
    }*/

    getRestEndPointUrl(apiEndPoint) {
        // needs more testing
        if(apiEndPoint.indexOf(REST_API_URL) === -1) {
            // check if the Endpoint begins with '/'. If not, add '/'
            if(apiEndPoint.charAt(0) !== '/') {
                apiEndPoint = '/' + apiEndPoint
            }
            return REST_API_URL + apiEndPoint
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