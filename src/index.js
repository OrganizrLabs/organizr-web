// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import StoreProvider, { user } from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

// routes
import Dashboard from 'scenes/Dashboard';
import Login from 'scenes/Login';
import SignUp from 'scenes/SignUp';

const requireAuth = (nextState, replace) => {
  if (!user.loggedIn) {
    replace({
      pathname: '/login'
    });
  }
};

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <StoreProvider>
      <Router>
        <div>
          <Route
            path="/dashboard"
            component={Dashboard}
            onEnter={requireAuth}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Router>
    </StoreProvider>
  </LocaleProvider>,
  document.getElementById('root')
);
registerServiceWorker();
