// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import StoreProvider from 'stores';

// routes
import Dashboard from 'scenes/Dashboard';
import Login from 'scenes/Login';
import SignUp from 'scenes/SignUp';

ReactDOM.render(
  <StoreProvider>
    <Router>
      <div>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);
registerServiceWorker();
