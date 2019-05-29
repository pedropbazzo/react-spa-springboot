import React from 'react'
import { Link } from 'react-router-dom';

function Logout() {
    return (
        <div>
            <h3>You have successfully logged out</h3>
            <div>Click here to log in <Link to="/login">Login</Link></div>
        </div>
    )
}

export default Logout;