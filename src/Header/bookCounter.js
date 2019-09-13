import React from 'react';
import {connect} from 'react-redux';

const Counter = props => {
    return (
        <li className="main-header__nav--list"><a href="">No. of Books {props.count}</a></li>
    );
}

const mapStateToProps = (state) => {
    return {
        count: state.counter
    };
}


export default connect(mapStateToProps)(Counter);