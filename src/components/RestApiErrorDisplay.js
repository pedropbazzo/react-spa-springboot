import React from 'react'

const style = {
    color: 'red',
    fontSize: '20px'
  };

function RestApiErrorDisplay(props) {
    const errorMessage = (props.errorMessage) ? props.errorMessage : 'Something went wrong'
    return (
        <div style={style}>{errorMessage}</div>
    )
}

export default RestApiErrorDisplay