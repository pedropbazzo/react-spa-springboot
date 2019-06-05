import axios from 'axios'

class ApiService {
    get(url) {
       return axios.get(url)
    }
}

export default new ApiService()