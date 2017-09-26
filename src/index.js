// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Layout from 'components/Layout';
import StoreProvider from 'stores';

// routes
import Dashboard from 'scenes/Dashboard';

ReactDOM.render(
  <StoreProvider>
    <Router>
      <Layout>
        <Redirect to="/dashboard" />
        <Route path="/dashboard" component={Dashboard} />
      </Layout>
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);
registerServiceWorker();
