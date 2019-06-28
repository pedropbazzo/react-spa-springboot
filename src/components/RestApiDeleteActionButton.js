import React, { Component } from 'react'
import ApiService from '../services/ApiService';

class RestApiDeleteActionButton extends Component {
    _isMounted = false
    
    constructor(props) {
        super(props)
        this.state = {
            inProcess: false
        }
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    
    onClickRestDelete(deleteUrl) {
        this.setState({inProcess: true})
        ApiService.delete(deleteUrl)
            .then(() => {
                // show a success message
                if(this.props.onDeleteSuccess) {
                    this.props.onDeleteSuccess()
                }
            })
            .catch((error) => {
                // show an error message
                console.log(error)
            })
            .finally(() => {
                if(this._isMounted) {
                    this.setState({inProcess: false})
                }
            })
    }

    render() {
        const btnClass = (this.props.btnClass) ? this.props.btnClass : 'btn-danger'
        return (
            <button 
                className={"btn " + btnClass}
                onClick={() => this.onClickRestDelete(this.props.deleteUrl)} 
                disabled={this.props.disabled || this.state.inProcess} 

            >Delete</button>
        )
    }
}

export default RestApiDeleteActionButton

