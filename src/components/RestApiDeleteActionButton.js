import React, { Component } from 'react'
import ApiService from '../services/ApiService';

//import ApiService from '../services/ApiService'

class RestApiDeleteActionButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inProcess: false
        }
    }
    
    onClickRestDelete(deleteUrl) {
        //ApiService.delete
        this.setState({inProcess: true})
        ApiService.delete(deleteUrl)
        .then((response) => {
            console.log(this.props)
            console.log("1")
            //if(this.props.onDeletSuccess) {
                console.log("2")
                this.props.onDeletSuccess()
            //}
        })
        .catch((error) => console.log(error))
        .finally(() => {this.setState({"inProcess": false})})
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

