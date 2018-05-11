// @flow
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import GoogleButton from 'react-google-button';
import Layout from 'components/Layout';
import { loginUser } from 'store/user/userActions';

type Props = {
  firebase: {
    login: Function
  },
  auth: Object,
  loginUser: void => void,
  // logged in state, stored locally in redux
  loggedIn: boolean
};

export const LoginPage = ({ firebase, auth, loginUser, loggedIn }: Props) => {
  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Layout>
      {!isLoaded(auth)
        ? <Spin />
        : isEmpty(auth)
          ? <div>
              <GoogleButton
                onClick={() =>
                  firebase
                    .login({ provider: 'google', type: 'popup' })
                    .then(loginUser)}
              >
                Login With Google
              </GoogleButton>
              <span>Not Authed</span>
            </div>
          : <Redirect to="/dashboard" />}
    </Layout>
  );
};

const mapStateToProps = ({ user: { loggedIn }, firebase: { auth } }) => ({
  auth,
  loggedIn
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginUser: () => {
    dispatch(loginUser());
  }
});

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage);
