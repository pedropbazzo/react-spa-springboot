import React from 'react'

const style = {
    color: 'red',
    fontSize: '20px'
  };

function RestApiErrorDisplay(props) {
    return (
        <div style={style}>{props.errorMessage}</div>
    )
}

export default RestApiErrorDisplay