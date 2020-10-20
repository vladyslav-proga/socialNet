import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Main from './containers/Main/Main';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.autoSignIn();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={ Main }/>
        <Route path="/auth" exact component={ Auth }/>
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
        <Route path="/" exact component={ Main } />
        <Route path="/profile" exact component={ Main } />
        <Route path="/logout"  component={Logout} />
        <Redirect to="/" />
      </Switch>
      );
    }

    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );

  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoSignIn: (token, userId) => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
