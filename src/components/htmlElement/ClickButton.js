import React, { Component } from 'react'

class ClickButton extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
       const btnType = (this.props.btnType) ? this.props.btnType : null
       let btnText = 'Button'
       if(this.props.btnType) {
           btnText = this.props.btnType.charAt(0).toUpperCase() + this.props.btnType.slice(1)
       }
       
       let btnClass = 'btn btn-sm '
       switch(btnType) {
            case 'delete':
                btnClass += 'btn-danger'
                break
            case 'update':
                btnClass += 'btn-warning'
                break
            case 'add':
                btnClass += 'btn-info'
                break
            default:
                break
        }
        
        return (
            <button type="button" className={btnClass} onClick={this.handleClick} disabled={this.props.disabled} >
                {btnText}
            </button>
        )
    }

    handleClick() {
        this.props.onClick()
    }
}

export default ClickButton

