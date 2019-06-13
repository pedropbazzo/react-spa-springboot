import React, {Component} from 'react'
import ApiService from '../services/ApiService'
import DataLoading from './DataLoading'
import RestApiErrorDisplay from './RestApiErrorDisplay'
//import AuthenticationService from '../services/AuthenticationService'

class RestApiGetData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            error: '',
            loading: false
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        ApiService.get(this.props.endPoint)
            .then(data => this.setState({data}))
            .catch(error => this.setState({error: error.message}))
            .finally(() => this.setState({loading: false}))
    }

    render() {
        if(this.state.loading) {
            return <DataLoading fetchingText={this.props.fetchingText} />
        }
        if(this.state.error) {
            return <RestApiErrorDisplay errorMessage={this.state.error} />
        }
        return this.props.render(this.state.data)
    }
}

export default RestApiGetData