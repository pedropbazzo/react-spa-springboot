import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService'
//import { withRouter } from 'react-router-dom'

class Header extends Component {
    // to see header except on / and /login, uncomment all the commented out lines of code
    // https://stackoverflow.com/questions/42010053/react-router-this-props-location ( search for word withRouter )
    render() {
        return (
            <div>
                {/*((this.props.location.pathname !== '/') && (this.props.location.pathname !== '/login')) && <div>Header<hr/></div>*/}
                
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="navbar-brand">SpringBoot React SPA</div>
                        <ul className="navbar-nav">
                            <li>
                                <Link className="nav-link" to="/welcome">Home</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="/todos">Todos</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            <li>
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li>
                                <Link onClick={AuthenticationService.logout} className="nav-link" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                </header>

            </div>
        )
    }
}

//export default withRouter(Header)
export default Header