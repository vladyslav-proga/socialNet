import React, { Component } from 'react';
import { connect } from 'react-redux';

import LogIn from './LogIn/LogIn';
import LogUp from './LogUp/LogUp';

class Auth extends Component {

    render() {
        return (
            <div>
                {this.props.authMode === 'sign-in' && 
                <LogIn />}
                {this.props.authMode === 'sign-up' && 
                <LogUp />}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        authMode: state.auth.mod
    }
};

export default connect(mapStateToProps)(Auth);