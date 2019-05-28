import React, {Component} from 'react'
//import { withRouter } from 'react-router-dom'

class Header extends Component {
    // to see header except on / and /login, uncomment all the commented out lines of code
    // https://stackoverflow.com/questions/42010053/react-router-this-props-location ( search for word withRouter )
    render() {
        return (
            <div>
                {/*((this.props.location.pathname !== '/') && (this.props.location.pathname !== '/login')) && <div>Header<hr/></div>*/}
                Header<hr />
            </div>
        )
    }
}

//export default withRouter(Header)
export default Header