// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import StoreProvider, { user } from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

// routes
import Kolas from 'scenes/Kolas';
import Login from 'scenes/Login';
import SignUp from 'scenes/SignUp';
import Meets from 'scenes/Meets';
import Teams from 'scenes/Teams';
import Regions from 'scenes/Regions';

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
          <Redirect from="/" exact to="/login" />
          <Route path="/kolas" component={Kolas} onEnter={requireAuth} />
          <Route path="/regions" component={Regions} onEnter={requireAuth} />
          <Route path="/teams" component={Teams} onEnter={requireAuth} />
          <Route path="/meets" component={Meets} onEnter={requireAuth} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Router>
    </StoreProvider>
  </LocaleProvider>,
  document.getElementById('root')
);
registerServiceWorker();
