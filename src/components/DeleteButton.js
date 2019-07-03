import React, { Component } from 'react'

class DeleteButton extends Component {
    //_isMounted = false
    
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    /*componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }*/
    
    render() {
        const btnClass = (this.props.btnClass) ? this.props.btnClass : 'btn-danger'
        return (
            <button 
                className={"btn " + btnClass}
                onClick={this.handleDelete} 
                disabled={this.props.disabled} 

            >{(this.props.disabled) ? 'Deleting ...' : 'Delete'}</button>
        )
    }

    handleDelete() {
        this.props.onClick()
    }
}

export default DeleteButton

