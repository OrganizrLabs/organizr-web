// @flow
// from https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Redirect, Route } from 'react-router-dom';
import { defaultRoute } from 'constants/app';

type Props = {
  /** Component to be rendered by the route */
  component: React.Element,
  /** Whether or not the component should be rendered (if authed is false the user is instead
   * redirected to the default route of the application, as defined in `scenes/index.js`)
   */
  auth: Object
};

/**
 * Route that handles authentication. Basically if `authed` is true it functions
 * like a normal React Route `<Route />` component but if `authed` is false it
 * renders a redirect to the default application path.
 */
const AuthedRoute = ({ component: Component, auth, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isLoaded(auth) || isEmpty(auth)
          ? <Redirect
              to={{
                pathname: defaultRoute.path,
                state: { from: props.location }
              }}
            />
          : <Component {...props} />}
    />
  );
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth }))
)(AuthedRoute);
