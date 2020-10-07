import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Main from './containers/Main/Main';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const App = (props) => {

  let routes = (
    <Switch>
      <Route path="/" exact component={ Main }/>
      <Route path="/auth" exact component={ Auth }/>
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
      <Route path="/" exact component={ Main }/>
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(App);
