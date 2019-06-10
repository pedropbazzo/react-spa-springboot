import {Component} from 'react'
import ApiService from '../services/ApiService'
//import AuthenticationService from '../services/AuthenticationService'

class RestApiCall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        ApiService.get(this.props.endPoint)
            .then(todos => this.setState({data: todos}))
            .catch(error => console.log(error))
    }

    render() {
        return this.props.render(this.state.data)
    }
}

export default RestApiCall