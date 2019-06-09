import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import ApiService from '../services/ApiService'
import AuthenticationService from '../services/AuthenticationService'

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: '',
            errorMessage: ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
    }
    
    render() {
        return (
            <div className="container">
                <h1>Welcome!</h1>
                <div>Welcome {AuthenticationService.getLoggedInUser()}. You can manage your Todos at <Link to="/todos">Todos</Link></div>
                <div>Click <button onClick={this.retrieveWelcomeMessage}>Get welcome message</button> to get a customized welcome message</div>
                {this.state.welcomeMessage.length > 0 && <h3>{this.state.welcomeMessage}</h3>}
                {this.state.errorMessage.length > 0 && <div>{this.state.errorMessage}</div>}
            </div>
        )
    }

    retrieveWelcomeMessage() {
        let timeStamp = Math.floor(Date.now());
        ApiService.get('http://localhost:8082/hello-world/' + timeStamp)
        .then(data => {
            this.setState({
                welcomeMessage: data.message,
                errorMessage: ''
            })
        })
        .catch(error => {
            this.setState({
                errorMessage: error.message,
                welcomeMessage: ''
            })
        })
    }

}

export default Welcome