import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Main from './containers/Main/Main';
import Auth from './containers/Auth/Auth';

function App() {

  const routes = (
    <Switch>
      <Route path="/" exact component={ Main }/>
      <Route path="/auth" exact component={ Auth }/>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
        { routes }
      </Layout>
    </div>
  );
}

export default App;
