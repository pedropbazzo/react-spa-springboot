import React from 'react'
import { Link } from 'react-router-dom';

function RouteNotFound() {
    return (
        <div>
            <div>Page does not exist</div>
            Click here to go back <Link to="/welcome">Welcome</Link>
        </div>
    )
}

export default RouteNotFound;