// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import StoreProvider from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

// routes
import Timeline from 'scenes/Timeline';
import Media from 'scenes/Media';

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <StoreProvider>
      <Router>
        <div>
          <Redirect from="/" exact to="/media" />
          <Route path="/timeline" component={Timeline} />
          <Route path="/media" component={Media} />
        </div>
      </Router>
    </StoreProvider>
  </LocaleProvider>,
  document.getElementById('root')
);
registerServiceWorker();
