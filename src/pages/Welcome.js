import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
    }
    render() {
        return (
            <div className="container">
                <h1>Welcome!</h1>
                <div>Welcome john.doe. You can manage your Todos at <Link to="/todos">Todos</Link></div>
                <div>Click <button onClick={this.retrieveWelcomeMessage}>Get welcome message</button> to get a customized welcome message</div>
            </div>
        )
    }
}

export default Welcome