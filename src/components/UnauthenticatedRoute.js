import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from '../services/AuthenticationService'

function UnauthenticatedRoute(props) {
    if(!AuthenticationService.isUserLoggedIn()) {
        return <Route {...props} />
    } else {
        return <Redirect to ="/welcome" />
    }
}

export default UnauthenticatedRoute