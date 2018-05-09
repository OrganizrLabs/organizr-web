// @flow
import * as React from 'react';
import Layout from 'components/Layout';

/**
 * Page that is rendered when the application hits a route that
 * is not mapped to any other component
 */
const NotFound = () =>
  <Layout>
    <h1>Page not found :(</h1>
  </Layout>;

export default NotFound;
