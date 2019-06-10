import {Component} from 'react'
import ApiService from '../services/ApiService'
import AuthenticationService from '../services/AuthenticationService'

class RestApiCall extends Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUser()
        ApiService.get(`/users/${username}/todos`)
            .then(todos => this.setState({data: todos}))
            .catch(error => console.log(error))
    }

    render() {
        return this.props.render(this.state.data)
    }
}

export default RestApiCall