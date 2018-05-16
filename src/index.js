// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { scenes, defaultRoute } from 'constants/app';
import AuthedRoute from 'components/AuthedRoute';
import { persistor, store } from 'store';
import NotFound from 'scenes/NotFound';

const defaultPath = defaultRoute.path;

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <div>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to={'/login'} />}
              />
              <Route
                exact
                path={defaultPath}
                component={defaultRoute.component}
              />
              {scenes.map(
                (scene, i) =>
                  scene.name !== defaultRoute.name &&
                  <AuthedRoute
                    path={scene.path}
                    component={scene.component}
                    key={i}
                  />
              )}
              <Route path="*" exact component={NotFound} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
);
// registerServiceWorker();
