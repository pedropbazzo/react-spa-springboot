import React, {Component} from 'react'

import AuthenticationService from '../../services/AuthenticationService'

import AppContext from '../../AppContext'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked(context) {
        AuthenticationService.login(this.state.username, this.state.password)
        .then(response => {
            if(response && response.token) {
                AuthenticationService.onLoginSuccess(this.state.username, response.token)
                this.props.history.push("/welcome")
                context.login()
            } else {
                this.setState({hasLoginFailed: true})
            }
        })
        .catch(() => {
            this.setState({hasLoginFailed: true})
        })
    }
    
    render() {
        return (
            <AppContext.Consumer>
                {(context) => 
                    <div>
                        <h1>Login</h1>
                        <div className="container">
                            {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                            User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                            Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            <button className="btn btn-success" onClick={() => {this.loginClicked(context)}}>Login</button>
                        </div>
                    </div>
                }
            </AppContext.Consumer>
        )
    }
}

export default Login