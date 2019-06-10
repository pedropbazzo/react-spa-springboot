import React, {Component} from 'react'
import ApiService from '../services/ApiService'
import DataLoading from './DataLoading'
//import AuthenticationService from '../services/AuthenticationService'

class RestApiCall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        ApiService.get(this.props.endPoint)
            .then(todos => this.setState({data: todos}))
            .catch(error => console.log(error))
            .finally(() => this.setState({loading: false}))
    }

    render() {
        if(this.state.loading) {
            return <DataLoading />
        }
        return this.props.render(this.state.data)
    }
}

export default RestApiCall