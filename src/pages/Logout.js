import React from 'react'
import { Link } from 'react-router-dom';

function Logout() {
    return (
        <div>
            <div>You have successfully logged out</div>
            Click here to log in <Link to="/login">Login</Link>
        </div>
    )
}

export default Logout;