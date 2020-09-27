import React, { Component } from 'react';

import LogIn from './LogIn/LogIn';
import LogUp from './LogUp/LogUp';

class Auth extends Component {

    state = {
        authMode: 'sign-in'
    }

    onChangeAuthMod = () => {
        if (this.state.authMode === 'sign-up') {
            this.setState({ authMode: 'sign-in' });
        } else {
            this.setState({ authMode: 'sign-up' });
        }
    }

    render() {
        return (
            <div>
                {this.state.authMode === 'sign-in' && <LogIn onChangeMod={this.onChangeAuthMod} />}
                {this.state.authMode === 'sign-up' && <LogUp onChangeMod={this.onChangeAuthMod} />}
            </div>
        );
    }
};

export default Auth;