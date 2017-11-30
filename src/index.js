// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import StoreProvider from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

// routes
import Home from 'scenes/Home';
import Timeline from 'scenes/Timeline';
import Media from 'scenes/Media';

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <StoreProvider>
      <Router basename="/dossier/">
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/media" component={Media} />
        </div>
      </Router>
    </StoreProvider>
  </LocaleProvider>,
  document.getElementById('root')
);
// registerServiceWorker();
