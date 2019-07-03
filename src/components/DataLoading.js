import React, {Component} from 'react'
import { css } from '@emotion/core';
// First way to import
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class DataLoading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }
    
    render() {
        return (
            <div className='sweet-loadings'>
                <div>{this.props.fetchingText} ...</div>
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={25}
                    color={'#D75D36'}
                    loading={this.state.loading}
                />
            </div> 
        )
    }
}

export default DataLoading