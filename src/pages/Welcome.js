import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import ApiService from '../services/ApiService'

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
    }
    
    render() {
        return (
            <div className="container">
                <h1>Welcome!</h1>
                <div>Welcome john.doe. You can manage your Todos at <Link to="/todos">Todos</Link></div>
                <div>Click <button onClick={this.retrieveWelcomeMessage}>Get welcome message</button> to get a customized welcome message</div>
                <h3>{this.state.welcomeMessage}</h3>
            </div>
        )
    }

    retrieveWelcomeMessage() {
        let timeStamp = Math.floor(Date.now());
        ApiService.get('http://localhost:8082/hello-world/' + timeStamp)
        .then(response => {
            this.setState({
                welcomeMessage: response.data.message
            })
        })
        .catch(error => console.log(error))
    }

}

export default Welcome