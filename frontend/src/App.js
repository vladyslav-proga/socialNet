import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

function App() {

  const routes = (
    <Switch>
      <Route path="/"/>
    </Switch>
  );

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
