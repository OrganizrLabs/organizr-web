// @flow
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import GoogleButton from 'react-google-button';
import Layout from 'components/Layout';

type Props = {
  firebase: {
    login: Function
  },
  auth: Object
};

export const LoginPage = ({ firebase, auth }: Props) => {
  console.log(auth);
  return (
    <Layout>
      <div>
        <h2>Auth</h2>
        {!isLoaded(auth)
          ? <span>Loading...</span>
          : isEmpty(auth)
            ? <div>
                <GoogleButton
                  onClick={() =>
                    firebase.login({ provider: 'google', type: 'popup' })}
                >
                  Login With Google
                </GoogleButton>
                <span>Not Authed</span>
              </div>
            : <Redirect to="/home" />}
      </div>
    </Layout>
  );
};

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage);
