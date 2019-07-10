import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';

import AuthenticationService from '../../services/AuthenticationService'

import AppContext from '../../AppContext'

class LogoutLink extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    render() {
        return (
            <AppContext.Consumer>
                {(context) => <NavLink onClick={() => {this.logout(context)}} className="nav-link" to="/logout">Logout</NavLink>}
            </AppContext.Consumer>
        )
    }

    logout(context) {
        AuthenticationService.logout();
        context.logout()
    }
}

export default LogoutLink