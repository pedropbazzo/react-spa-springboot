import React, {Component} from 'react'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked() {
        if(this.state.username === 'john.doe' && this.state.password === 'password') {
            this.setState({showSuccessMessage: true, hasLoginFailed: false})
        } else {
            this.setState({showSuccessMessage: false, hasLoginFailed: true})
        }
    }
    
    render() {
        return (
            <div>
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
}

export default Login