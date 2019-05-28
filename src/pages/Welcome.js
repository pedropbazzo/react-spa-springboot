import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class Welcome extends Component {
    render() {
        return (
            <div>Welcome john.doe. You can manage your Todos at <Link to="/todos">Todos</Link></div>
        )
    }
}

export default Welcome