import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
import LogoutLink from '../components/LogoutLink'
import AppContext from '../AppContext'
//import { withRouter } from 'react-router-dom'


class Header extends Component {
    // to see header except on / and /login, uncomment all the commented out lines of code
    // https://stackoverflow.com/questions/42010053/react-router-this-props-location ( search for word withRouter )
    render() {
        return (
            <AppContext.Consumer>
                {(context) => 
                    <header>
                        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                            <div className="navbar-brand">SpringBoot React SPA</div>
                            <ul className="navbar-nav">
                                {context.state.isUserLoggedIn && <li>
                                    <NavLink className="nav-link" to="/welcome">Home</NavLink>
                                </li>}
                                {context.state.isUserLoggedIn && <li>
                                    <NavLink className="nav-link" to="/todos">Todos</NavLink>
                                </li>}
                            </ul>
                            <ul className="navbar-nav navbar-collapse justify-content-end">
                                {!context.state.isUserLoggedIn && <li>
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>}
                                {context.state.isUserLoggedIn && <li>
                                    <LogoutLink />
                                </li>}
                            </ul>
                        </nav>
                    </header>
                }
            </AppContext.Consumer>
        )
    }
}

//export default withRouter(Header)
export default Header